/* eslint-disable no-unused-vars */
import { Dispatch } from 'react';

import {
  CreateEmployeeAvailability,
  EmployeeAvailability,
  EmployeeAvailabilityState,
// eslint-disable-next-line max-len
} from '@/hooks/employee-availability/interfaces/employee-availability-state.interface';
import {
  setEmployeeAvailabilityAction,
// eslint-disable-next-line max-len
} from '@/hooks/employee-availability/types/employee-availability-actions.types';

export interface EmployeeAvailabilityContextData {
  state: EmployeeAvailabilityState;
  dispatch: Dispatch<setEmployeeAvailabilityAction>;
  createEmployeeAvailability: (
    employeeAvailability: CreateEmployeeAvailability,
  ) => Promise<void>;
  getByCompanyId: (
    companyId: string,
  ) => Promise<EmployeeAvailability[] | undefined>;
  isUpdatingEmployee: boolean;
}
