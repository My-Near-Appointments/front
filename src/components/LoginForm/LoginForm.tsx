import { useCallback, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { BsFillPersonBadgeFill, BsFillFileLock2Fill } from 'react-icons/bs';
import * as yup from 'yup';

import {
  Stack,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Input,
  FormHelperText,
  Button,
  useToast,
} from '@chakra-ui/react';

import { AuthTypes } from '@/hooks/authentication/types/auth-actions.types';
import { useAuthentication } from '@/hooks/authentication/useAuthentication';
import axiosInstance from '@/services/axios/axios-instance';

interface IFormInput {
  username: string;
  password: string;
}

const schema = yup.object().shape({
  username: yup.string().required('Username é obrigatório'),
  password: yup.string().required('Senha é obrigatória'),
});

export default function LoginForm() {
  const [isDoingLogin, setIsDoingLogin] = useState(false);
  const { dispatch } = useAuthentication();
  const { push } = useRouter();

  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = (data: IFormInput) => {
    setIsDoingLogin(true);

    axiosInstance
      .post('/auth/login', data)
      .then((response) => {
        setIsDoingLogin(false);
        onLoginSuccess(response.data.access_token);
      })
      .catch(() => {
        setIsDoingLogin(false);
        showLoginError();
      });
  };

  const showLoginError = useCallback(() => {
    toast({
      title: 'Ocorreu um erro ao tentar realizar o login',
      status: 'error',
      duration: 3000,
      isClosable: false,
    });
  }, [toast]);

  const onLoginSuccess = (token: string) => {
    dispatch({
      type: AuthTypes.LOGIN,
      payload: {
        token: token,
      },
    });

    push('/dashboard');
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing="6">
        <Stack spacing="5">
          <FormControl mr="5%">
            <FormLabel htmlFor="username" fontWeight={'normal'}>
              Username
            </FormLabel>
            <InputGroup>
              <InputLeftElement>
                <BsFillPersonBadgeFill />
              </InputLeftElement>
              <Input placeholder="Username" {...register('username')} />
            </InputGroup>
            <FormHelperText>{errors.username?.message}</FormHelperText>
          </FormControl>
        </Stack>

        <Stack spacing="5">
          <FormControl mr="5%">
            <FormLabel htmlFor="password" fontWeight={'normal'}>
              Password
            </FormLabel>
            <InputGroup>
              <InputLeftElement>
                <BsFillFileLock2Fill />
              </InputLeftElement>
              <Input
                type="password"
                placeholder="Password"
                {...register('password')}
              />
            </InputGroup>
            <FormHelperText>{errors.password?.message}</FormHelperText>
          </FormControl>
        </Stack>

        <Stack spacing="6">
          <Button
            type="submit"
            isDisabled={!isValid}
            isLoading={isDoingLogin}
            colorScheme={'green'}
            bg={'green.400'}
            rounded={'full'}
            px={6}
            _hover={{
              bg: 'green.500',
            }}
          >
            Login
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}
