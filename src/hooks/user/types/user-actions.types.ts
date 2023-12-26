/* eslint-disable no-unused-vars */
import { User } from '@/hooks/user/interfaces/user-state.interface';

export enum UserTypes {
  SET_USER = 'SET_USER',
  SET_USER_ID = 'SET_USER_ID',
  REMOVE_USER = 'REMOVE_USER',
}

export interface UserPayload {
  user?: User;
  userId?: string;
}

export type UserActions = {
  type: UserTypes;
  payload: UserPayload;
}
