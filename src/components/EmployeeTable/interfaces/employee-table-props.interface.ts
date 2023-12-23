/* eslint-disable no-unused-vars */

import { Employee } from '@/hooks/employee/interfaces/employee-state.interface';

export interface EmployeeTableProps {
  employees: Employee[];
  updateEmployee: (data: Employee) => void;
  activateEmployee: (id: string) => void;
  deactivateEmployee: (id: string) => void;
  deleteEmployee: (id: string) => void;
  createEmployeeAvailability: (data: Employee) => void;
}
