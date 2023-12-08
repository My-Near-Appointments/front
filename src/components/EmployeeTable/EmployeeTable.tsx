/* eslint-disable no-unused-vars */
import {
  CalendarIcon,
  ChevronDownIcon,
  DeleteIcon,
  EditIcon,
  LockIcon,
  UnlockIcon,
} from '@chakra-ui/icons';
import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Badge,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Flex,
  Avatar,
  Text,
} from '@chakra-ui/react';

import { Employee } from '@/hooks/employee/interfaces/employee-state.interface';

interface EmployeeTableProps {
  employees: Employee[];
  updateEmployee: (id: string, data: Employee) => void;
  activateEmployee: (id: string) => void;
  deactivateEmployee: (id: string) => void;
  deleteEmployee: (id: string) => void;
}

export default function EmployeeTable({
  employees,
  activateEmployee,
  deactivateEmployee,
  deleteEmployee,
}: EmployeeTableProps) {
  return (
    <TableContainer>
      <Table variant="striped">
        <TableCaption>Lista de empregados</TableCaption>
        <Thead>
          <Tr>
            <Th>Empregados</Th>
            <Th>Status</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {employees.map((employee) => (
            <Tr key={employee.id}>
              <Td>
                <Flex justifyContent={'flex-start'} alignItems={'center'}>
                  <Avatar
                    name={employee.name}
                    src={employee.photoLink}
                    mr={'2'}
                  />
                  <Text fontWeight={'bold'}>{employee.name}</Text>
                </Flex>
              </Td>
              <Td>
                {employee.active ? (
                  <Badge colorScheme="green">Ativo</Badge>
                ) : (
                  <Badge colorScheme="red">Desabilitado</Badge>
                )}
              </Td>
              <Td>
                <Menu>
                  <MenuButton
                    as={Button}
                    aria-label="Options"
                    rightIcon={<ChevronDownIcon />}
                  >
                    Opções
                  </MenuButton>
                  <MenuList>
                    {employee.active ? (
                      <MenuItem
                        icon={<LockIcon />}
                        onClick={() => deactivateEmployee(employee.id)}
                      >
                        Desabilitar
                      </MenuItem>
                    ) : (
                      <MenuItem
                        icon={<UnlockIcon />}
                        onClick={() => activateEmployee(employee.id)}
                      >
                        Habilitar
                      </MenuItem>
                    )}
                    <MenuItem icon={<EditIcon />}>Editar</MenuItem>
                    <MenuItem icon={<CalendarIcon />}>Horários</MenuItem>
                    <MenuItem
                      icon={<DeleteIcon />}
                      onClick={() => deleteEmployee(employee.id)}
                    >
                      Remover
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
