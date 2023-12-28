import { Company } from '@/hooks/company/interfaces/company-state.interface';

/* eslint-disable no-unused-vars */
export enum CompanyTypes {
  SET_COMPANY = 'SET_USER',
  SET_COMPANIES = 'SET_COMPANIES',
}

export interface SetCompanyPayload {
  company?: Company;
}

export interface SetCompaniesPayload {
  companies: Company[];
}

export type SetCompanyAction = {
  type: CompanyTypes.SET_COMPANY;
  payload: SetCompanyPayload;
};

export type SetCompaniesAction = {
  type: CompanyTypes.SET_COMPANIES;
  payload: SetCompaniesPayload;
}

export type CompanyActions = SetCompanyAction | SetCompaniesAction;
