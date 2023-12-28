import { Company } from '@/hooks/company/interfaces/company-state.interface';
import {
  Employee,
} from '@/hooks/employee/interfaces/employee-state.interface';
import {
  EmployeeAvailability,
// eslint-disable-next-line max-len
} from '@/hooks/employee-availability/interfaces/employee-availability-state.interface';

export interface CreateAppointmentModalProps {
  currentCompany: Company;
  employees: Employee[];
  employeeAvailability: EmployeeAvailability[];
  isOpen: boolean;
  onClose: () => void;
}
