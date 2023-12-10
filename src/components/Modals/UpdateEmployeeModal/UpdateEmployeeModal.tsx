import { useRef, useState, useCallback } from 'react';

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
  UpdateEmployeeModalProps,
// eslint-disable-next-line max-len
} from '@/components/Modals/UpdateEmployeeModal/interfaces/update-employee-props.interface';

export default function UpdateEmployeeModal({
  employee,
  isOpen,
  onClose,
}: UpdateEmployeeModalProps) {
  const {
    state: { company },
  } = useCompany();
  const { updateEmployee } = useEmployee();
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

  const handleUpdateEmployee = (data: EmployeeFormData) => {
    if (company) {
      updateEmployee(employee.id, {
        ...data,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Atualize dados do seu empregado</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <EmployeeForm
            closeCallback={onClose}
            onFormSubmit={handleUpdateEmployee}
            onFormValidityChange={handleFormValidity}
            ref={submitRef}
            employeeId={employee?.id}
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
