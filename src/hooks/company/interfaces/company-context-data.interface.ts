/* eslint-disable no-unused-vars */
import { Dispatch } from 'react';

import {
  Company,
  CompanyState,
} from '@/hooks/company/interfaces/company-state.interface';
import { CompanyActions } from '@/hooks/company/types/company-actions.types';

export interface CompanyContextData {
  state: CompanyState;
  dispatch: Dispatch<CompanyActions>;
  getCompanyByOwnerId: (userId: string) => Promise<void>;
  getCompanyById: (companyId: string) => Promise<Company>;
  getCompanies: () => Promise<void>;
  isUpdatingCompany: boolean;
}
