import { forwardRef, useCallback, useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
} from '@chakra-ui/react';

import { Employee } from '@/hooks/employee/interfaces/employee-state.interface';
import { useEmployee } from '@/hooks/employee/useEmployee';
import {
  useCreateEmployeeSchema,
} from '@/hooks/validations/create-employee/useCreateEmployeeSchema';

import {
  EmployeeFormData,
  // eslint-disable-next-line max-len
} from '@/components/Forms/Employee/EmployeeForm/interfaces/employee-form-data.interface';
import {
  EmployeeFormProps,
  // eslint-disable-next-line max-len
} from '@/components/Forms/Employee/EmployeeForm/interfaces/employee-form-props.interface';

export default forwardRef<HTMLButtonElement, EmployeeFormProps>(
  function EmployeeForm(
    {
      closeCallback,
      onFormSubmit,
      onFormValidityChange,
      employeeId,
    }: EmployeeFormProps,
    ref,
  ) {
    const schema = useCreateEmployeeSchema();
    const { getEmployeeById } = useEmployee();

    const {
      register,
      handleSubmit,
      reset,
      setValue,
      formState: { errors, isValid },
    } = useForm({
      resolver: yupResolver(schema),
      mode: 'onBlur',
      criteriaMode: 'all',
    });

    useEffect(() => {
      onFormValidityChange(isValid);
    }, [isValid, onFormValidityChange, reset]);

    const updateEmployeeForm = useCallback((employee: Employee) => {
      setValue('name', employee.name);
      setValue('photoLink', employee.photoLink);
    }, [setValue]);

    useEffect(() => {
      async function getEmployee() {
        if (employeeId) {
          const employee = await getEmployeeById(employeeId);

          if (employee) {
            updateEmployeeForm(employee);
          }
        }
      }

      getEmployee();
    }, [employeeId, getEmployeeById, updateEmployeeForm]);

    const onSubmit = async (data: EmployeeFormData) => {
      reset();
      onFormSubmit(data);
      closeCallback();
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.name?.message}>
          <FormLabel>Nome</FormLabel>
          <Input {...register('name')} placeholder="Nome" />
          <FormHelperText>Nome do empregado</FormHelperText>
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>

        <FormControl mt={4} isInvalid={!!errors.photoLink?.message}>
          <FormLabel>Avatar URL</FormLabel>
          <Input {...register('photoLink')} placeholder="URL para um avatar" />
          <FormHelperText>URL para avatar do empregado</FormHelperText>
          <FormErrorMessage>{errors.photoLink?.message}</FormErrorMessage>
        </FormControl>

        <button
          ref={ref}
          type="submit"
          data-testid="hidden-button"
          style={{ display: 'none' }}
          disabled={!isValid}
        />
      </form>
    );
  },
);
