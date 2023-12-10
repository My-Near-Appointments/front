import { Employee } from '@/hooks/employee/interfaces/employee-state.interface';

export interface UpdateEmployeeModalProps {
  employee: Employee;
  isOpen: boolean;
  onClose: () => void;
}
