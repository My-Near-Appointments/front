/* eslint-disable max-len */
import { useCallback, useEffect, useMemo, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import DatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';

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
  FormLabel,
  InputGroup,
  useToast,
  FormErrorMessage,
  Radio,
  RadioGroup,
} from '@chakra-ui/react';

import {
  Appointment,
  CreateAppointment,
} from '@/hooks/appointment/interfaces/appointments-state.interface';
import { useAppointment } from '@/hooks/appointment/useAppointment';
import { useUser } from '@/hooks/user/useUser';
import {
  useCreateAppointmentSchema,
} from '@/hooks/validations/create-appointment/useCreateAppointmentSchema';

import CustomDateInput from '@/components/CustomDateInput/CustomDateInput';
import {
  CreateAppointmentFormProps,
} from '@/components/Modals/CreateAppointmentModal/interfaces/create-appointment-form-props.interface';
import {
  CreateAppointmentModalProps,
  // eslint-disable-next-line max-len
} from '@/components/Modals/CreateAppointmentModal/interfaces/create-appointment-modal-props.interface';
import 'react-datepicker/dist/react-datepicker.css';

const ONE_HOUR = 60 * 60 * 1000;

export default function CreateAppointmentModal({
  isOpen,
  onClose,
  employees,
  employeeAvailability,
  currentCompany,
}: CreateAppointmentModalProps) {
  const toast = useToast();
  const appointmentSchema = useCreateAppointmentSchema();

  const [selectedDates, setSelectedDates] = useState<{
    [key: string]: Date | null;
  }>({});
  const [lastSelectedDate, setLastSelectedDate] = useState<Date | null>(null);
  const [currentEmployeeId, setCurrentEmployeeId] = useState('');

  const {
    formState: { isValid, errors },
    handleSubmit,
    setValue,
    trigger,
    reset,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(appointmentSchema),
  });

  const {
    state: { user },
  } = useUser();
  const { create, getFilteredByEmployeeId } = useAppointment();

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

  const isSlotAvailable = useCallback(
    (current: Date, bookedAppointments: Appointment[]) => {
      const isSlotAvailable = !bookedAppointments.some((appointment) => {
        const appointmentStart = new Date(appointment.start);
        const appointmentEnd = new Date(appointment.end);
        return (
          (current >= appointmentStart && current < appointmentEnd) ||
          (new Date(current.getTime() + ONE_HOUR) > appointmentStart &&
            new Date(current.getTime() + ONE_HOUR) <= appointmentEnd)
        );
      });

      return isSlotAvailable;
    },
    [],
  );

  const generateAppointmentSlots = useCallback(
    (start: Date, end: Date, bookedAppointments: Appointment[]) => {
      const slots = [];
      let current = new Date(start);

      while (current < end) {
        const isAvailable = isSlotAvailable(current, bookedAppointments);

        if (isAvailable) {
          slots.push(new Date(current));
        }

        current.setHours(current.getHours() + 1);
      }
      return slots.map((slot) => ({
        time: slot,
      }));
    },
    [isSlotAvailable],
  );

  const employeeSlots = useMemo(() => {
    return employees.map((employee) => {
      const selectedDate = selectedDates?.[employee.id];
      if (!selectedDate) {
        return [];
      }

      const bookedAppointments = getFilteredByEmployeeId(employee.id);
      const availabilityForDay = employeeAvailability
        .filter((availability) => {
          const availabilityDate = new Date(availability.start);
          return (
            availability.employeeId === employee.id &&
            availabilityDate.toDateString() === selectedDate.toDateString()
          );
        })
        .map((availability) => ({
          start: new Date(availability.start),
          end: new Date(availability.end),
        }));

      if (availabilityForDay.length === 0) {
        return [];
      }

      const { start, end } = availabilityForDay[0];
      const slots = generateAppointmentSlots(start, end, bookedAppointments);

      return slots;
    });
  }, [
    employees,
    selectedDates,
    getFilteredByEmployeeId,
    employeeAvailability,
    generateAppointmentSlots,
  ]);

  useEffect(() => {
    if (lastSelectedDate) {
      setValue('appointmentDate', lastSelectedDate);
      trigger();
    }
  }, [lastSelectedDate, setValue, trigger]);

  const handleAppointmentDateChanges = useCallback(
    (employeeId: string, newDate: Date | null) => {
      setSelectedDates({
        [employeeId]: newDate,
      });
      setLastSelectedDate(newDate);

      if (!newDate) {
        return;
      }

      setValue('appointmentDate', newDate);
      setCurrentEmployeeId(employeeId);
      trigger();
    },
    [setValue, trigger],
  );

  const handleSlotChanges = useCallback(
    (employeeId: string, inputValue: string) => {
      setValue('appointmentSlot', inputValue);
      setCurrentEmployeeId(employeeId);
      trigger();
    },
    [setValue, trigger],
  );

  const saveApppointment = useCallback(
    async (startDate: Date, endDate: Date) => {
      const appointment: CreateAppointment = {
        companyId: currentCompany.id,
        employeeId: currentEmployeeId,
        start: new Date(startDate),
        end: new Date(endDate),
        userId: user?.id as string,
      };

      try {
        await create(appointment);

        toast({
          title: 'Agendamento efetuado com sucesso!',
          status: 'success',
          duration: 3000,
        });
        onClose();
      } catch (error) {
        onClose();
        toast({
          title:
            // eslint-disable-next-line max-len
            'Ocorreu um erro ao tentar efetuar o registro do agendamento',
          status: 'error',
          duration: 3000,
          isClosable: false,
        });
      }
    },
    [create, currentCompany?.id, currentEmployeeId, onClose, toast, user?.id],
  );

  const onSubmit = useCallback(
    async (data: CreateAppointmentFormProps) => {
      const appointmentStart = new Date(data.appointmentSlot);
      const appointmentEnd = new Date(
        appointmentStart.getTime() + ONE_HOUR,
      );

      await saveApppointment(
        appointmentStart,
        appointmentEnd,
      );
    },
    [saveApppointment],
  );

  const handleClose = useCallback(() => {
    onClose();
    reset();
    setLastSelectedDate(null);
    setSelectedDates({});
    trigger();
    
  }, [onClose, reset, trigger]);

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Agendamentos</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
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
                          <FormControl>
                            <FormLabel>Data para agendamento</FormLabel>
                            <InputGroup className="dark-theme">
                              <Box position="relative" w="100%">
                                <DatePicker
                                  name={`appointmentDate.${employee.id}`}
                                  withPortal
                                  portalId="root-portal2"
                                  selected={selectedDates[employee.id]}
                                  onChange={(date) =>
                                    handleAppointmentDateChanges(
                                      employee.id,
                                      date,
                                    )
                                  }
                                  value={
                                    selectedDates[employee.id]
                                      ? format(
                                          selectedDates[employee.id] as Date,
                                          'dd/MM/yyyy',
                                        )
                                      : ''
                                  }
                                  dateFormat="dd/MM/yyyy"
                                  locale={ptBR}
                                  customInput={<CustomDateInput />}
                                  highlightDates={availableDates(employee.id)}
                                  filterDate={(date) =>
                                    handleFilterDate(date, employee.id)
                                  }
                                />
                              </Box>
                            </InputGroup>
                            <FormErrorMessage>
                              {errors.appointmentDate?.message?.toString()}
                            </FormErrorMessage>
                          </FormControl>
                          {selectedDates[employee.id] &&
                            employeeSlots.map((slots, i) => (
                              <RadioGroup
                                key={i + employee.id}
                                mt="4"
                                name={`employeeSlot.${employee.id}`}
                              >
                                <Stack
                                  spacing={4}
                                  direction="row"
                                  flexWrap="wrap"
                                >
                                  {slots.map((slot, j) => (
                                    <Radio
                                      key={j}
                                      value={slot.time.toString()}
                                      onChange={(input) =>
                                        handleSlotChanges(
                                          employee.id,
                                          input.target.value,
                                        )
                                      }
                                    >
                                      {format(slot.time, 'hh:mm')}
                                    </Radio>
                                  ))}
                                </Stack>
                              </RadioGroup>
                            ))}
                        </Box>
                      </Box>
                    ))}
                </Stack>
              </CardBody>
            </Card>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              colorScheme="green"
              mr={3}
              isDisabled={!isValid}
            >
              Agendar
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
