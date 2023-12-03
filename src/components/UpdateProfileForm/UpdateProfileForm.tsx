import { useCallback, useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import {
  BsFillPersonVcardFill,
  BsFillPersonBadgeFill,
  BsFillFileLock2Fill,
} from 'react-icons/bs';

import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  useToast,
} from '@chakra-ui/react';

import { UserTypes } from '@/hooks/user/types/user-actions.types';
import { useUser } from '@/hooks/user/useUser';
import {
  useUpdateUserSchema,
} from '@/hooks/validations/update-user/useUpdateUserSchema';
import { useUpdateUser } from '@/services/user-update/useUpdateUser';

import {
  UpdateProfileFormData
// eslint-disable-next-line max-len
} from '@/components/UpdateProfileForm/interfaces/update-profile-form-data.interface';

export default function UpdateProfileForm() {
  const router = useRouter();
  const toast = useToast();
  const updateUserSchema = useUpdateUserSchema();
  const{ updateUser, updatedUserData, isUpdatingUser, error } = useUpdateUser();
  const { dispatch, state: { user} } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(updateUserSchema),
    mode: 'onChange',
  });

  const onSubmit =  async (data: UpdateProfileFormData) => {
    const userData = {
      name: `${data.firstName} ${data.lastName}`,
      password: data.password,
    };

    if (user?.id) {
      await updateUser(user.id, userData);
    }
  };

  const handleUpdateSuccess = useCallback(() => {
    toast({
      title: 'Usuário atualizado com sucesso',
      status: 'success',
      duration: 3000,
      isClosable: false,
    });

    router.push('/dashboard');
  }, [toast, router]);

  useEffect(() => {
    if (updatedUserData) {
      dispatch({
        type: UserTypes.SET_USER,
        payload: {
          user: updatedUserData,
        },
      });
      handleUpdateSuccess();
    }
  }, [updatedUserData, dispatch, handleUpdateSuccess]);

  const showProfileUpdateToastError = useCallback(() => {
    toast({
      title: 'Ocorreu um erro ao tentar atualizar o usuário',
      status: 'error',
      duration: 3000,
      isClosable: false,
    });
  }, [toast]);

  useEffect(() => {
    if (error) {
      showProfileUpdateToastError();
    }
  }, [error, showProfileUpdateToastError]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
        Atualização de Usuário
      </Heading>

      <Flex>
        <FormControl mr="5%">
          <FormLabel htmlFor="firstName" fontWeight={'normal'}>
            Nome
          </FormLabel>
          <InputGroup>
            <InputLeftElement>
              <BsFillPersonVcardFill />
            </InputLeftElement>
            <Input {...register('firstName')} placeholder="Nome" />
          </InputGroup>
          <FormHelperText>{errors.firstName?.message}</FormHelperText>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="lastName" fontWeight={'normal'}>
            Sobrenome
          </FormLabel>
          <InputGroup>
            <InputLeftElement>
              <BsFillPersonBadgeFill />
            </InputLeftElement>
            <Input {...register('lastName')} placeholder="Sobrenome" />
          </InputGroup>
          <FormHelperText>{errors.lastName?.message}</FormHelperText>
        </FormControl>
      </Flex>

      <FormControl>
        <FormLabel htmlFor="password" fontWeight={'normal'} mt="2%">
          Senha
        </FormLabel>
        <InputGroup size="md">
          <InputLeftElement>
            <BsFillFileLock2Fill />
          </InputLeftElement>
          <Input
            pr="4.5rem"
            type="password"
            {...register('password')}
            placeholder="Preencha com a senha"
          />
        </InputGroup>
        <FormHelperText>{errors.password?.message}</FormHelperText>
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="passwordConfirmation" fontWeight={'normal'} mt="2%">
          Confirme a senha
        </FormLabel>
        <InputGroup size="md">
          <InputLeftElement>
            <BsFillFileLock2Fill />
          </InputLeftElement>
          <Input
            pr="4.5rem"
            type="password"
            {...register('passwordConfirmation')}
            placeholder="Preencha com a senha"
          />
        </InputGroup>
        <FormHelperText>{errors.passwordConfirmation?.message}</FormHelperText>
      </FormControl>

      <Flex mt="10%" justify={'center'}>
        <Button
          type="submit"
          w="100%"
          colorScheme={'green'}
          variant="solid"
          isDisabled={!isValid || isUpdatingUser}
          isLoading={isUpdatingUser}
          loadingText="Atualizando..."
        >
          Atualizar usuário
        </Button>
      </Flex>
    </form>
  );
}
