'use client';

import {
  createContext,
  useContext,
  useLayoutEffect,
  useReducer,
  useState,
} from 'react';

import {
  UserContextData,
} from '@/hooks/user/interfaces/user-context-data.interface';
import {
  UserProviderProps,
} from '@/hooks/user/interfaces/user-provider-props.interface';
import {
  User,
  UserRole,
  UserState,
} from '@/hooks/user/interfaces/user-state.interface';
import { UserActions, UserTypes } from '@/hooks/user/types/user-actions.types';
import {
  LocalStorageService,
} from '@/services/local-storage/local-storage.service';

const userContext = createContext<UserContextData>({
  state: { user: null, userId: '' },
  dispatch: () => {},
  isCompanyAdmin: false,
  setIsCompanyAdmin: () => {},
});

const userReducer = (state: UserState, action: UserActions): UserState => {
  switch (action.type) {
    case UserTypes.SET_USER:
      LocalStorageService.set<User>('user', action.payload?.user as User);

      return {
        ...state,
        user: action.payload?.user || null,
      };
    case UserTypes.SET_USER_ID:
      LocalStorageService.set<string>(
        'user_id',
        action.payload?.userId as string,
      );

      return {
        ...state,
        userId: action.payload?.userId || '',
      };

    case UserTypes.REMOVE_USER:
      LocalStorageService.remove('user');
      LocalStorageService.remove('user_id');

      return {
        ...state,
        user: null,
        userId: undefined,
      };

    default:
      return state;
  }
};

export function UserProvider({ children }: UserProviderProps) {
  const [state, dispatch] = useReducer(userReducer, { user: null, userId: '' });
  const [isCompanyAdmin, setIsCompanyAdmin] = useState(false);

  useLayoutEffect(() => {
    setIsCompanyAdmin(state.user?.role === UserRole.COMPANY_ADMIN);
  }, [state.user]);

  useLayoutEffect(() => {
    const user = LocalStorageService.get('user');

    if (user) {
      dispatch({ type: UserTypes.SET_USER, payload: { user } });
      setIsCompanyAdmin(user.role === UserRole.COMPANY_ADMIN);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <userContext.Provider
      value={{ state, dispatch, isCompanyAdmin, setIsCompanyAdmin }}
    >
      {children}
    </userContext.Provider>
  );
}

export function useUser() {
  const context = useContext(userContext);

  if (!context) {
    throw new Error('useUser must be used within an UserProvider');
  }

  return context;
}
