import { Employee } from '@/hooks/employee/interfaces/employee-state.interface';

export interface CreateEmployeeAvailabilityModalProps {
  employee: Employee;
  isOpen: boolean;
  onClose: () => void;
}
