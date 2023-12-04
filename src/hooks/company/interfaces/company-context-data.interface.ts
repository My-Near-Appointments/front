import { Dispatch } from 'react';

import {
  CompanyState,
} from '@/hooks/company/interfaces/company-state.interface';
import { CompanyActions } from '@/hooks/company/types/company-actions.types';

export interface CompanyContextData {
  state: CompanyState;
  dispatch: Dispatch<CompanyActions>;
  // eslint-disable-next-line no-unused-vars
  getCompany: (userId: string) => Promise<void>;
  isUpdatingCompany: boolean;
}
