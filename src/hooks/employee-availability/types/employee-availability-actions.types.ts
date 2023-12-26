/* eslint-disable no-unused-vars */

import {
  EmployeeAvailability,
// eslint-disable-next-line max-len
} from '@/hooks/employee-availability/interfaces/employee-availability-state.interface';

export enum EmployeeAvailabilityTypes {
  SET_EMPLOYEE_AVAILABILITY = 'SET_EMPLOYEE_AVAILABILITY',
}

export interface SetEmployeeAvailabilityPayload {
  employees: EmployeeAvailability[];
}

export type setEmployeeAvailabilityAction = {
  type: EmployeeAvailabilityTypes;
  payload: SetEmployeeAvailabilityPayload;
}
