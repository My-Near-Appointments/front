import { User } from "@/hooks/user/interfaces/user-state.interface";

export enum UserTypes {
  SET_USER = 'SET_USER',
  SET_USER_ID = 'SET_USER_ID',
}

export interface UserPayload {
  user?: User;
  userId?: string;
}

export type UserActions = {
  type: UserTypes;
  payload: UserPayload;
}
