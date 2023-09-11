import { Dispatch } from 'react';
import { AuthState } from '@/hooks/authentication/interfaces/auth-state.interface';
import { AuthActions } from '@/hooks/authentication/types/auth-actions.types';

export interface AuthenticationContextData {
  state: AuthState;
  dispatch: Dispatch<AuthActions>;
}
