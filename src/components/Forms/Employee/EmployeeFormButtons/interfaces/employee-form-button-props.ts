import { ButtonProps } from '@chakra-ui/react';

export interface EmployeeFormButtonsProps extends ButtonProps {
  isValid: boolean;
  closeCallback: () => void;
  handleSubmit: () => void;
}
