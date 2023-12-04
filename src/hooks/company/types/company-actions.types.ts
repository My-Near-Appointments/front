import { Company } from '@/hooks/company/interfaces/company-state.interface';

/* eslint-disable no-unused-vars */
export enum CompanyTypes {
  SET_COMPANY = 'SET_USER',
}

export interface CompanyPayload {
  company?: Company;
}

export type CompanyActions = {
  type: CompanyTypes;
  payload: CompanyPayload;
};
