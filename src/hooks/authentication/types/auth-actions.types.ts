/* eslint-disable no-unused-vars */
export enum AuthTypes {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

export interface AuthPayload {
  token: string;
}

export type AuthActions = {
  type: AuthTypes;
  payload?: AuthPayload;
};
