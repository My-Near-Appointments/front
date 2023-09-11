export enum AuthTypes {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

export type AuthActions = {
  type: AuthTypes;
};
