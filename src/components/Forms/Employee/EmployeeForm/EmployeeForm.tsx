import { forwardRef, useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
} from '@chakra-ui/react';

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
    { closeCallback, onFormSubmit, onFormValidityChange }: EmployeeFormProps,
    ref,
  ) {
    const schema = useCreateEmployeeSchema();

    const {
      register,
      handleSubmit,
      reset,
      formState: { errors, isValid },
    } = useForm({
      resolver: yupResolver(schema),
      mode: 'onChange',
      criteriaMode: 'all',
    });

    useEffect(() => {
      onFormValidityChange(isValid);
    
    }, [isValid, onFormValidityChange, reset]);

    const onSubmit = async (data: EmployeeFormData) => {
      reset();
      onFormSubmit(data);
      closeCallback();
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel>Nome</FormLabel>
          <Input {...register('name')} placeholder="Nome" />
          <FormHelperText>Nome do empregado</FormHelperText>
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Avatar URL</FormLabel>
          <Input {...register('photoLink')} placeholder="URL para um avatar" />
          <FormHelperText>URL para avatar do empregado</FormHelperText>
          <FormErrorMessage>{errors.photoLink?.message}</FormErrorMessage>
        </FormControl>

        <button ref={ref} type="submit" style={{ display: 'none' }} />
      </form>
    );
  },
);
