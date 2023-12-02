'use client';

import { createContext, useContext, useLayoutEffect, useReducer } from 'react';

import {
  AuthProviderProps
} from '@/hooks/authentication/interfaces/auth-provider-props.interface';
import {
  AuthState,
} from '@/hooks/authentication/interfaces/auth-state.interface';
import {
  AuthenticationContextData,
  // eslint-disable-next-line max-len
} from '@/hooks/authentication/interfaces/authentication-context-data.interface';
import {
  AuthActions,
  AuthTypes,
} from '@/hooks/authentication/types/auth-actions.types';
import {
  LocalStorageService,
} from '@/services/local-storage/local-storage.service';

const authContext = createContext<AuthenticationContextData>({
  state: { isAuthenticated: false, token: '' },
  dispatch: () => {},
});

const authReducer = (state: AuthState, action: AuthActions): AuthState => {
  const token = action.payload?.token || '';

  switch (action.type) {
    case AuthTypes.LOGIN:
      LocalStorageService.set<string>('authToken', token);

      return {
        ...state,
        isAuthenticated: true,
        token: action.payload?.token || '',
      };
    case AuthTypes.LOGOUT:
      LocalStorageService.remove('authToken');

      return {
        ...state,
        isAuthenticated: false,
        token: '',
      };
    default:
      return state;
  }
};
export function AuthProvider({ children }: AuthProviderProps) {
  const initialAuthState = {
    isAuthenticated: false,
    token: '',
  };

  useLayoutEffect(() => {
    const token = LocalStorageService.get('authToken');

    if (token) {
      dispatch({ type: AuthTypes.LOGIN, payload: { token } });
    }
  }, []);

  const [state, dispatch] = useReducer(authReducer, initialAuthState);
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
