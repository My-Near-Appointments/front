'use client';

import { useCallback, useMemo } from 'react';
import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
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
  InputGroup,
  FormControl,
  FormLabel,
  Box,
  FormHelperText,
  FormErrorMessage,
} from '@chakra-ui/react';

import CustomDateInput from '@/components/CustomDateInput/CustomDateInput';
import {
  EmployeeAvailabilityRange,
  // eslint-disable-next-line max-len
} from '@/components/Modals/CreateEmployeeAvailabilityModal/interfaces/availability-range.interface';
import {
  CreateEmployeeAvailabilityFormProps,
  // eslint-disable-next-line max-len
} from '@/components/Modals/CreateEmployeeAvailabilityModal/interfaces/create-employee-availability-form-props.interface';
import {
  CreateEmployeeAvailabilityModalProps,
  // eslint-disable-next-line max-len
} from '@/components/Modals/CreateEmployeeAvailabilityModal/interfaces/create-employee-availability-modal-props.interface';

import 'react-datepicker/dist/react-datepicker.css';
const schema = yup.object().shape({
  dateRange: yup.array().of(yup.date().required('Date range is required')),
  startTime: yup.date().required('Start time is required'),
  endTime: yup.date().required('End time is required'),
});

export default function CreateEmployeeAvailabilityModal({
  isOpen,
  onClose,
}: CreateEmployeeAvailabilityModalProps) {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const handleCloseModal = useCallback(() => {
    reset({
      dateRange: [],
      endTime: undefined,
      startTime: undefined,
    });
    onClose();
  }, [onClose, reset]);

  const onSubmit = useCallback((data: CreateEmployeeAvailabilityFormProps) => {
    const { dateRange, startTime, endTime } = data;

    if (!dateRange || dateRange.length === 0) {
      return;
    }

    let currentDate = new Date(dateRange[0]);
    const endDate = new Date(dateRange[1]);

    const range: EmployeeAvailabilityRange[] = [];

    while (currentDate <= endDate) {
      const startDateTime = new Date(currentDate)
      startDateTime.setHours(
        startTime.getHours(),
        startTime.getMinutes(),
        startTime.getSeconds(),
        startTime.getMilliseconds(),
      );

      const endDateTime = new Date(currentDate)
      endDateTime.setHours(
        endTime.getHours(),
        endTime.getMinutes(),
        endTime.getSeconds(),
        endTime.getMilliseconds(),
      );

      range.push({
        start: startDateTime,
        end: endDateTime,
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    handleCloseModal();
  }, [handleCloseModal]);

  const getDateLimit = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 15);

    return date;
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Escolha a escala do empregado</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody pb={6}>
            <FormControl isInvalid={!!errors?.dateRange}>
              <FormLabel>Data inicial/final</FormLabel>
              <InputGroup className="dark-theme">
                <Controller
                  control={control}
                  name="dateRange"
                  render={({ field }) => (
                    <Box position="relative">
                      <DatePicker
                        withPortal
                        portalId="root-portal"
                        selected={field?.value?.[0]}
                        onChange={(dates) => field.onChange(dates)}
                        startDate={field?.value?.[0]}
                        endDate={field?.value?.[1]}
                        minDate={new Date()}
                        maxDate={getDateLimit}
                        selectsRange
                        dateFormat="dd/MM/yyyy"
                        locale={ptBR}
                        customInput={<CustomDateInput />}
                      />
                    </Box>
                  )}
                />
              </InputGroup>
              <FormHelperText>Selecione inicio e fim da escala</FormHelperText>
              <FormErrorMessage>{errors.dateRange?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors?.startTime}>
              <FormLabel>Horário inicial de trabalho</FormLabel>
              <InputGroup>
                <Controller
                  control={control}
                  name="startTime"
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={60}
                      timeCaption="Horário"
                      dateFormat="HH:mm"
                      locale={ptBR}
                      customInput={<CustomDateInput />}
                    />
                  )}
                />
              </InputGroup>
              <FormHelperText>Selecione inicio da escala</FormHelperText>
              <FormErrorMessage>{errors.startTime?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors?.endTime}>
              <FormLabel>Horário final de trabalho</FormLabel>
              <InputGroup>
                <Controller
                  control={control}
                  name="endTime"
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={60}
                      timeCaption="Horário"
                      dateFormat="HH:mm"
                      locale={ptBR}
                      customInput={<CustomDateInput />}
                    />
                  )}
                />
              </InputGroup>
              <FormHelperText>Selecione fim da escala</FormHelperText>
              <FormErrorMessage>{errors.endTime?.message}</FormErrorMessage>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              colorScheme="green"
              mr={3}
              isDisabled={!isValid}
            >
              Enviar
            </Button>
            <Button onClick={handleCloseModal}>Cancelar</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
