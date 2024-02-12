'use client';

import { useCallback, useEffect, useState } from 'react';

import { CalendarIcon } from '@chakra-ui/icons';
import {
  Text,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  useColorModeValue,
  Box,
  useDisclosure,
} from '@chakra-ui/react';

import { useAppointment } from '@/hooks/appointment/useAppointment';
import { Company } from '@/hooks/company/interfaces/company-state.interface';
import { useCompany } from '@/hooks/company/useCompany';
import { EmployeeTypes } from '@/hooks/employee/types/employee-actions.types';
import { useEmployee } from '@/hooks/employee/useEmployee';
import {
  useEmployeeAvailability
} from '@/hooks/employee-availability/useEmployeeAvailability';

import
  CreateAppointmentModal
from '@/components/Modals/CreateAppointmentModal/CreateAppointmentModal';

export default function Appointments() {
  const [currentCompany, setCurrentCompany] = useState<Company>();
  const [currentCompanyId, setCurrentCompanyId] = useState<string>('');
  const [isLoadingCompany, setIsLoadingCompany] = useState(false);
  const {
    dispatch,
    getEmployees,
    state: { employees },
  } = useEmployee();
  const {
    getByEmployeeId,
    state: { employeeAvailability },
  } = useEmployeeAvailability();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    getCompanies,
    getCompanyById,
    state: { companies },
  } = useCompany();
  const { getByEmployeeId: getAppointmentByEmployeeId } = useAppointment();

  const cardBackground = useColorModeValue('white', 'gray.700');

  useEffect(() => {
    getCompanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formattedCompanyAddress = useCallback((company: Company) => {
    return `
      ${company?.address?.street},
      ${company?.address?.number},
      ${company?.address?.city},
      ${company?.address?.state}
    `;
  }, []);

  const availabilityByEmployeeId = useCallback(
    async (employeeIds: string[]) => {
      employeeIds.forEach(async (employeeId) => {
        await getByEmployeeId(employeeId);
      });
    },
    [getByEmployeeId],
  );

  const appointmentsByEmployeeId = useCallback(
    async (employeeIds: string[]) => {
      employeeIds.forEach(async (employeeId) => {
        await getAppointmentByEmployeeId(employeeId);
      });
    },
    [getAppointmentByEmployeeId],
  );

  const onOpenModal = useCallback(
    async (companyId: string) => {
      setCurrentCompanyId(companyId);
      setIsLoadingCompany(true);
      dispatch({ type: EmployeeTypes.RESET_EMPLOYEES });

      try {
        const company = await getCompanyById(companyId);
        const employeeResponse = await getEmployees(companyId);

        const employeeIds = employeeResponse?.map((employee) => employee.id);

        await availabilityByEmployeeId(employeeIds);
        await appointmentsByEmployeeId(employeeIds);

        setCurrentCompany(company as Company);
      } finally {
        onOpen();
        setIsLoadingCompany(false);
      }
    },
    [
      appointmentsByEmployeeId,
      availabilityByEmployeeId,
      dispatch,
      getCompanyById,
      getEmployees,
      onOpen,
    ],
  );

  const canShowLoading = useCallback(
    (companyId: string) => {
      return isLoadingCompany && currentCompanyId === companyId;
    },
    [currentCompanyId, isLoadingCompany],
  );

  return (
    <>
      <Flex
        bg={useColorModeValue('gray.50', 'gray.800')}
        justify="center"
        // minHeight="calc(100vh - 64px)"
      >
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 2 }}
          mt="10px"
          width="100%"
          spacing="6"
          mx="4"
        >
          {companies.map((company) => (
            <Box key={company.id}>
              <Card bg={cardBackground} variant="outline">
                <CardBody>
                  <Stack mt="6" spacing="3">
                    <Heading size="md">{company.name}</Heading>
                    <Text>
                      Serviços de cortes de cabelo pelo preço de 15 reais.
                    </Text>
                  </Stack>
                </CardBody>
                <CardFooter>
                  <Stack spacing="6">
                    <Text>{formattedCompanyAddress(company)}</Text>
                    <ButtonGroup spacing="2">
                      <Button
                        flex="1"
                        colorScheme={'green'}
                        bg={'green.400'}
                        rounded={'full'}
                        px={6}
                        _hover={{
                          bg: 'green.500',
                        }}
                        leftIcon={<CalendarIcon />}
                        onClick={() => onOpenModal(company.id)}
                        isLoading={canShowLoading(company.id)}
                      >
                        Agendar
                      </Button>
                    </ButtonGroup>
                  </Stack>
                </CardFooter>
              </Card>
            </Box>
          ))}
        </SimpleGrid>
      </Flex>
      <CreateAppointmentModal
        currentCompany={currentCompany as Company}
        employees={employees}
        employeeAvailability={employeeAvailability}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}
