'use client';

import { AuthProviderProps } from '@/hooks/authentication/interfaces/auth-provider-props.interface';
import { AuthState } from '@/hooks/authentication/interfaces/auth-state.interface';
import { AuthenticationContextData } from '@/hooks/authentication/interfaces/authentication-context-data.interface';
import { AuthActions } from '@/hooks/authentication/types/auth-actions.types';
import { createContext, useContext, useReducer } from 'react';

const authContext = createContext<AuthenticationContextData>({
  state: { isAuthenticated: false, token: '' },
  dispatch: () => {},
});

const authReducer = (state: AuthState, action: AuthActions): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
      };
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload?.token || '',
      };
    default:
      return state;
  }
};
export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, { isAuthenticated: false, token: '' });
  return (
    <authContext.Provider value={{ state, dispatch }}>
      {children}
    </authContext.Provider>
  );
}

export function useAuthentication() {
  const context = useContext(authContext);

  if (!context) {
    throw new Error('useAuthentication must be used within an AuthProvider');
  }

  return context;
}
