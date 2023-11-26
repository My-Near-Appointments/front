import { useCallback, useState } from 'react';
import {
  Heading,
  Flex,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputLeftElement,
  FormHelperText,
  Button,
  Radio,
  RadioGroup,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  BsFillFileLock2Fill,
  BsFillPersonBadgeFill,
  BsFillPersonFill,
  BsFillPersonVcardFill,
} from 'react-icons/bs';
import { EmailIcon } from '@chakra-ui/icons';
import { UserFormData } from '@/components/UserForm/interfaces/user-form-data.interface';
import axiosInstance from '@/services/axios/axios-instance';
import { UserFormProps } from '@/components/UserForm/interfaces/user-form-props.interface';

const schema = yup.object().shape({
  username: yup.string().required('username é obrigatório').min(4, 'Precisa conter no mínimo 4 caracteres').max(20, 'Pode conter no máximo 20 caracteres'),
  firstName: yup.string().required('Nome é obrigatório').min(2),
  lastName: yup.string().required('Sobrenome é obrigatório').min(2),
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  password: yup.string()
    .required('É necessário criar uma senha')
    .min(8, 'A senha precisa ter no mínimo 8 caracteres').matches(/^(?=.*[A-Z])/, "Precisa conter uma letra maiúscula")
    .matches(/^(?=.*[!@#\$%\^&\*])/, "Precisa conter um símbolo especial"),
  passwordConfirmation: yup.string().oneOf([yup.ref('password'), undefined], 'Senhas devem ser iguais'),
  userRole: yup.string().oneOf(['CompanyAdmin', 'Customer'], 'Role inválido').required('Role é obrigatório'),
});

export default function UserForm({ onRegistrationComplete }: UserFormProps) {
  const [isRegistering, setIsRegistering] = useState(false);
  const toast = useToast();

  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = (data: UserFormData) => {
    setIsRegistering(true);

    const userData = {
      username: data.username,
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      userRole: data.userRole,
      password: data.password,
    }

    axiosInstance.post('/user', userData)
      .then(() => {
        setIsRegistering(false);
        onRegistrationComplete(userData.userRole === 'CompanyAdmin');
      }).catch(() => {
        setIsRegistering(false);
        showRegistrationErrorToast();
      });
  };

  const showRegistrationErrorToast = useCallback(() => {
    toast({
      title: 'Ocorreu um erro ao tentar criar o usuário',
      status: 'error',
      duration: 3000,
      isClosable: false,
    });
  }, [toast]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
        Registro do usuário
      </Heading>
      <FormControl mb="2%">
        <FormLabel htmlFor="username" fontWeight={'normal'}>
          Username
        </FormLabel>
        <InputGroup>
          <InputLeftElement>
            <BsFillPersonFill />
          </InputLeftElement>
          <Input {...register('username')} placeholder="Username" />
        </InputGroup>
        <FormHelperText>{errors.username?.message}</FormHelperText>
      </FormControl>

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
        <FormLabel htmlFor="email" fontWeight={'normal'} mt="2%">
          Email
        </FormLabel>
        <InputGroup size="md">
          <InputLeftElement>
            <EmailIcon />
          </InputLeftElement>
          <Input
            pr="4.5rem"
            type='email'
            {...register('email')}
            placeholder="Preencha com o email"
          />
        </InputGroup>
        <FormHelperText>{errors.email?.message}</FormHelperText>
      </FormControl>

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
            type='password'
            {...register('password')}
            placeholder="Preencha com a senha"
          />
        </InputGroup>
        <FormHelperText>{errors.password?.message}</FormHelperText>
      </FormControl>

      <FormControl>
        <FormLabel
          htmlFor="passwordConfirmation"
          fontWeight={'normal'}
          mt="2%"
        >
          Confirme a senha
        </FormLabel>
        <InputGroup size="md">
          <InputLeftElement>
            <BsFillFileLock2Fill />
          </InputLeftElement>
          <Input
            pr="4.5rem"
            type='password'
            {...register('passwordConfirmation')}
            placeholder="Preencha com a senha"
          />
        </InputGroup>
        <FormHelperText>{errors.passwordConfirmation?.message}</FormHelperText>
      </FormControl>

      <Flex mt="2%">
        <RadioGroup defaultValue='Customer'>
          <Stack spacing={4} direction='row'>
            <Radio {...register('userRole')} value='Customer'>Quero realizar agendamentos</Radio>
            <Radio {...register('userRole')} value='CompanyAdmin'>Quero cadastrar minha barbearia</Radio>
          </Stack>
        </RadioGroup>
      </Flex>
      <Flex mt="10%" justify={'center'}>
        <Button
          type='submit'
          w="100%"
          colorScheme={'green'}
          variant="solid"
          isDisabled={!isValid}
          isLoading={isRegistering}
          loadingText="Cadastrando..."
        >
          Cadastrar usuário
        </Button>
      </Flex>
    </form>
  );
}
