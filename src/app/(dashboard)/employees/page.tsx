'use client';

import { useCallback, useEffect, useState } from 'react';

import {
  Box,
  Button,
  Flex,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';

import { useCompany } from '@/hooks/company/useCompany';
import { Employee } from '@/hooks/employee/interfaces/employee-state.interface';
import { useEmployee } from '@/hooks/employee/useEmployee';

import EmployeeTable from '@/components/EmployeeTable/EmployeeTable';
import
  CreateEmployeeModal
from '@/components/Modals/CreateEmployeeModal/CreateEmployeeModal';
import
  UpdateEmployeeModal
from '@/components/Modals/UpdateEmployeeModal/UpdateEmployeeModal';
export default function Employees() {
  const [currentEmployee, setCurrentEmployee] = useState<Employee>();
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure();

  const {
    isOpen: isUpdateOpen,
    onOpen: onUpdateOpen,
    onClose: onUpdateClose,
  } = useDisclosure();

  const {
    state: { company },
  } = useCompany();
  const {
    getEmployees,
    activateEmployee,
    deactivateEmployee,
    deleteEmployee,
    state: { employees },
  } = useEmployee();

  const deactivateEmployeeHandler = useCallback(
    (id: string) => {
      deactivateEmployee(id);
    },
    [deactivateEmployee],
  );

  const activateEmployeeHandler = useCallback(
    (id: string) => {
      activateEmployee(id);
    },
    [activateEmployee],
  );

  const deleteEmployeeHandler = useCallback(
    (id: string) => {
      deleteEmployee(id);
    },
    [deleteEmployee],
  );

  const updateEmployeeHandler = useCallback((employee: Employee) => {
    setCurrentEmployee(employee);

    onUpdateOpen();
  }, [onUpdateOpen]);

  useEffect(() => {
    if (company?.id) {
      getEmployees(company?.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Flex bg={useColorModeValue('gray.50', 'gray.800')}>
        <Box
          bg={useColorModeValue('white', 'gray.700')}
          borderWidth="1px"
          rounded="md"
          boxShadow="sm"
          maxWidth={900}
          width="100%"
          p={6}
          m="10px auto"
        >
          <Button mb={4} onClick={onCreateOpen}>
            Criar empregado
          </Button>
          <EmployeeTable
            employees={employees}
            activateEmployee={activateEmployeeHandler}
            deactivateEmployee={deactivateEmployeeHandler}
            deleteEmployee={deleteEmployeeHandler}
            updateEmployee={updateEmployeeHandler}
          />
        </Box>
      </Flex>
      <CreateEmployeeModal isOpen={isCreateOpen} onClose={onCreateClose} />
      <UpdateEmployeeModal
        employee={currentEmployee as Employee}
        isOpen={isUpdateOpen}
        onClose={onUpdateClose}
      />
    </>
  );
}
