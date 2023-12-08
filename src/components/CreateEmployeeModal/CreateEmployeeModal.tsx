import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  FormHelperText,
  FormErrorMessage,
} from '@chakra-ui/react';

// eslint-disable-next-line max-len
import { useCreateEmployeeSchema } from '@/hooks/validations/create-employee/useCreateEmployeeSchema';

import {
  CreateEmployeeFormData,
  // eslint-disable-next-line max-len
} from '@/components/CreateEmployeeModal/interfaces/create-employee-form-data.interface';
import {
  CreateEmployeeModalProps,
  // eslint-disable-next-line max-len
} from '@/components/CreateEmployeeModal/interfaces/create-employee-props.interface';

export default function CreateEmployeeModal({
  isOpen,
  onClose,
  createEmployee,
}: CreateEmployeeModalProps) {
  const schema = useCreateEmployeeSchema();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = async (data: CreateEmployeeFormData) => {
    createEmployee(data);
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Crie um novo empregado para sua barbearia</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Nome</FormLabel>
              <Input {...register('name')} placeholder="Nome" />
              <FormHelperText>Nome do empregado</FormHelperText>
              <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Avatar URL</FormLabel>
              <Input
                {...register('photoLink')}
                placeholder="URL para um avatar"
              />
              <FormHelperText>URL para avatar do empregado</FormHelperText>
              <FormErrorMessage>{errors.photoLink?.message}</FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              type="submit"
              isDisabled={!isValid}
              colorScheme="green"
              mr={3}
            >
              Criar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
