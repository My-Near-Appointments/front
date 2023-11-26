export type UserRoles = 'Customer' | 'CompanyAdmin';

export interface UserFormData {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  userRole: UserRoles;
  password: string;
  passwordConfirmation?: string;
};
