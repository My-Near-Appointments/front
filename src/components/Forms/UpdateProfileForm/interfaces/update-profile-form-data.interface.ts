export type UserRoles = 'Customer' | 'CompanyAdmin';

export interface UpdateProfileFormData {
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirmation?: string;
};
