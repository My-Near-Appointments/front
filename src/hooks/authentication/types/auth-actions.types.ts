/* eslint-disable no-unused-vars */
export enum AuthTypes {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  SET_TOKEN = 'SET_TOKEN',
}

export interface AuthPayload {
  token: string;
}

export type AuthActions = {
  type: AuthTypes;
  payload?: AuthPayload;
};
