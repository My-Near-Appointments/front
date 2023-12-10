'use client';

import { useCallback, useRef, useState } from 'react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';

import { useCompany } from '@/hooks/company/useCompany';
import { useEmployee } from '@/hooks/employee/useEmployee';

import
  EmployeeForm
  from '@/components/Forms/Employee/EmployeeForm/EmployeeForm';
import {
  EmployeeFormData,
  // eslint-disable-next-line max-len
} from '@/components/Forms/Employee/EmployeeForm/interfaces/employee-form-data.interface';
import {
  EmployeeFormButtons,
} from '@/components/Forms/Employee/EmployeeFormButtons/EmployeeFormButtons';
import {
  CreateEmployeeModalProps,
  // eslint-disable-next-line max-len
} from '@/components/Modals/CreateEmployeeModal/interfaces/create-employee-props.interface';

export default function CreateEmployeeModal({
  isOpen,
  onClose,
}: CreateEmployeeModalProps) {
  const {
    state: { company },
  } = useCompany();
  const { createEmployee } = useEmployee();
  const submitRef = useRef<HTMLButtonElement>(null);
  const [isValid, setFormIsValid] = useState(false);

  const handleButtonSubmit = () => {
    if (submitRef.current) {
      submitRef.current.click();
    }
  };

  const handleFormValidity = useCallback((isFormValid: boolean) => {
    setFormIsValid(isFormValid);
  }, []);

  const closeModal = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleCreateEmployee = (data: EmployeeFormData) => {
    if (company) {
      createEmployee({
        ...data,
        companyId: company?.id,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Crie um novo empregado para sua barbearia</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <EmployeeForm
            closeCallback={onClose}
            onFormSubmit={handleCreateEmployee}
            onFormValidityChange={handleFormValidity}
            ref={submitRef}
          />
        </ModalBody>
      <ModalFooter>
        <EmployeeFormButtons
          handleSubmit={handleButtonSubmit}
          closeCallback={closeModal}
          isValid={isValid}
        />
      </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
