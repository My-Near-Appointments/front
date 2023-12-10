'use client';

import { useCallback, useEffect } from 'react';

import {
  Box,
  Button,
  Flex,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';

import { useCompany } from '@/hooks/company/useCompany';
import { useEmployee } from '@/hooks/employee/useEmployee';

import EmployeeTable from '@/components/EmployeeTable/EmployeeTable';
import
  CreateEmployeeModal
  from '@/components/Modals/CreateEmployeeModal/CreateEmployeeModal';
export default function Employees() {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
          <Button mb={4} onClick={onOpen}>Criar empregado</Button>
          <EmployeeTable
            employees={employees}
            activateEmployee={activateEmployeeHandler}
            deactivateEmployee={deactivateEmployeeHandler}
            deleteEmployee={deleteEmployeeHandler}
            updateEmployee={() => {}}
          />
        </Box>
      </Flex>
      <CreateEmployeeModal
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}
