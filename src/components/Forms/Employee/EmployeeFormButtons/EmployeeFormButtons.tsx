'use client';

import { useCallback } from 'react';

import { Button } from '@chakra-ui/react';

import {
  EmployeeFormButtonsProps,
// eslint-disable-next-line max-len
} from '@/components/Forms/Employee/EmployeeFormButtons/interfaces/employee-form-button-props';

export function EmployeeFormButtons({
  isValid,
  closeCallback,
  handleSubmit,
}: EmployeeFormButtonsProps) {

  const onSubmit = useCallback(() => {
    handleSubmit();
  }, [handleSubmit]);

  return (
    <>
      <Button
        isDisabled={!isValid}
        colorScheme="green"
        mr={3}
        onClick={onSubmit}
      >
        Enviar
      </Button>
      <Button onClick={closeCallback}>Cancelar</Button>
    </>
  );
}
