import { useCallback, useMemo } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import DatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Card,
  CardBody,
  Heading,
  CardHeader,
  Box,
  Stack,
  StackDivider,
  Avatar,
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputGroup,
  Radio,
  RadioGroup,
} from '@chakra-ui/react';

import CustomDateInput from '@/components/CustomDateInput/CustomDateInput';
import {
  CreateAppointmentModalProps,
  // eslint-disable-next-line max-len
} from '@/components/Modals/CreateAppointmentModal/interfaces/create-appointment-modal-props.interface';

import 'react-datepicker/dist/react-datepicker.css';

const schema = yup.object().shape({
  appointmentDate: yup.lazy((value) =>
    yup.object().shape(
      Object.keys(value).reduce((shape: Record<string, any>, key) => {
        shape[key] = yup
          .date()
          .required('Preencher uma faixa de datas é obrigatório');
        return shape;
      }, {}),
    ),
  ),
  appointmentSlot: yup.lazy((value) =>
    yup.object().shape(
      Object.keys(value).reduce((shape: Record<string, any>, key) => {
        shape[key] = yup.date().required('A slot selection is required');
        return shape;
      }, {}),
    ),
  ),
});

export default function CreateAppointmentModal({
  isOpen,
  onClose,
  employees,
  employeeAvailability,
}: CreateAppointmentModalProps) {
  const {
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const selectedDates = watch('appointmentDate');

  const availableDates = useCallback(
    (employeeId: string) => {
      return employeeAvailability
        .filter(
          (availability) =>
            new Date(availability.start) > new Date() &&
            availability.employeeId === employeeId,
        )
        .map((range) => new Date(range.start));
    },
    [employeeAvailability],
  );

  const handleFilterDate = useCallback(
    (date: Date, employeeId: string) => {
      return availableDates(employeeId).some(
        (availableDate) =>
          date.getDate() === availableDate.getDate() &&
          date.getMonth() === availableDate.getMonth() &&
          date.getFullYear() === availableDate.getFullYear(),
      );
    },
    [availableDates],
  );

  const generateAppointmentSlots = (start: Date, end: Date) => {
    const slots = [];
    let current = new Date(start);

    while (current < end) {
      slots.push(new Date(current));
      current.setHours(current.getHours() + 1);
    }
    return slots.map((slot) => ({
      time: slot,
    }));
  };

  const employeeSlots = useMemo(() => {
    return employees.map((employee) => {
      const selectedDate = selectedDates?.[employee.id];
      if (!selectedDate) {
        return [];
      }

      const start = new Date(selectedDate);
      start.setHours(0, 0, 0, 0);
      const end = new Date(selectedDate);
      end.setHours(23, 59, 59, 999);

      return generateAppointmentSlots(start, end);
    });
  }, [employees, selectedDates]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Agendamentos</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Card maxW="sm">
            <CardHeader>
              <Heading size="md">
                Inicie um agendamento com um profissional abaixo
              </Heading>
            </CardHeader>
            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                {employees.length > 0 &&
                  employees.map((employee) => (
                    <Box key={employee.id}>
                      <Heading size="xs">
                        <Box
                          display="flex"
                          justifyContent="flex-start"
                          alignItems="center"
                          as="div"
                        >
                          <Avatar
                            name={employee.name}
                            src={employee.photoLink}
                            mr="2"
                          />
                          {employee.name}
                        </Box>
                      </Heading>

                      <Box mt="4">
                        <form>
                          <FormControl>
                            <FormLabel>Data para agendamento</FormLabel>
                            <InputGroup className="dark-theme">
                              <Controller
                                control={control}
                                name={`appointmentDate.${employee.id}`}
                                render={({ field }) => {
                                  return (
                                    <Box position="relative" w="100%">
                                      <DatePicker
                                        name={`appointmentDate.${employee.id}`}
                                        withPortal
                                        portalId="root-portal2"
                                        selected={field?.value}
                                        onChange={(date) => {
                                          setValue('appointmentDate', {
                                            [employee.id]: date,
                                          });
                                        }}
                                        value={
                                          field?.value
                                            ? format(field.value, 'dd/MM/yyyy')
                                            : ''
                                        }
                                        dateFormat="dd/MM/yyyy"
                                        locale={ptBR}
                                        customInput={<CustomDateInput />}
                                        highlightDates={availableDates(
                                          employee.id,
                                        )}
                                        filterDate={(date) =>
                                          handleFilterDate(date, employee.id)
                                        }
                                      />
                                    </Box>
                                  );
                                }}
                              />
                            </InputGroup>
                            <FormErrorMessage>
                              {errors.appointmentDate?.[
                                employee.id
                              ]?.message?.toString()}
                            </FormErrorMessage>
                          </FormControl>

                          {employeeSlots.map((slots, i) => (
                            <Controller
                              key={i}
                              control={control}
                              name={`appointmentSlot.${employees[i].id}`}
                              render={({ field }) => (
                                <RadioGroup
                                  key={employees[i].id}
                                  mt="4"
                                  value={field.value}
                                  onChange={field.onChange}
                                >
                                  <Stack spacing={4} direction="row">
                                    {slots.map((slot, j) => (
                                      <Radio
                                        key={j}
                                        value={slot.time.toString()}
                                      >
                                        {format(slot.time, 'hh:mm')}
                                      </Radio>
                                    ))}
                                  </Stack>
                                </RadioGroup>
                              )}
                            />
                          ))}
                        </form>
                      </Box>
                    </Box>
                  ))}
              </Stack>
            </CardBody>
          </Card>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3}>
            Agendar
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
