/* eslint-disable no-unused-vars */
export enum UserRole {
  ADMIN = 'Admin',
  COMPANY_ADMIN = 'CompanyAdmin',
  CUSTOMER = 'Customer',
}

export interface User {
  id: string;
  name: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
  role: UserRole;
}

export interface UserState {
  user: User | null;
  userId?: string;
}
