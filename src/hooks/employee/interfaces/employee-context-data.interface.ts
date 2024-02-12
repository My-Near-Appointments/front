/* eslint-disable no-unused-vars */
import { Dispatch } from 'react';

import {
  CreateEmployee,
  Employee,
  EmployeeState,
  UpdateEmployee,
} from '@/hooks/employee/interfaces/employee-state.interface';
import { EmployeeActions } from '@/hooks/employee/types/employee-actions.types';

export interface EmployeeContextData {
  state: EmployeeState;
  dispatch: Dispatch<EmployeeActions>;
  createEmployee: (employee: CreateEmployee) => Promise<void>;
  getEmployees: (userId: string) => Promise<Employee[]>;
  getEmployeeById: (id: string) => Promise<Employee | undefined>;
  updateEmployee: (id: string, employee: UpdateEmployee) => Promise<void>;
  deactivateEmployee: (employeeId: string) => Promise<void>;
  activateEmployee: (employeeId: string) => Promise<void>;
  deleteEmployee: (employeeId: string) => Promise<void>;
  isUpdatingEmployee: boolean;
}
