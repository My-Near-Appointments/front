/* eslint-disable no-unused-vars */
import {
  EmployeeFormData,
// eslint-disable-next-line max-len
} from '@/components/Forms/Employee/EmployeeForm/interfaces/employee-form-data.interface';

export interface EmployeeFormProps {
  closeCallback: () => void;
  onFormSubmit: (data: EmployeeFormData) => void;
  employeeId?: string;
  onFormValidityChange(isValid: boolean): void;
}
