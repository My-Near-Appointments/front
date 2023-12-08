/* eslint-disable no-unused-vars */
import {
  CreateEmployeeFormData,
// eslint-disable-next-line max-len
} from '@/components/CreateEmployeeModal/interfaces/create-employee-form-data.interface';

export interface CreateEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  createEmployee: (data: CreateEmployeeFormData) => void;
}
