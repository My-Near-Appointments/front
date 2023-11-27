import { useCallback, useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { BsBuildings, BsJournalText } from 'react-icons/bs';
import * as yup from 'yup';

import { EmailIcon } from '@chakra-ui/icons';
import {
  Heading,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Input,
  FormHelperText,
  Textarea,
  useToast,
  Button,
  Flex,
  Text,
  Stack,
  InputRightElement,
  Spinner,
} from '@chakra-ui/react';

import { useAddress } from '@/hooks/address/useAddress';
import { useUser } from '@/hooks/user/useUser';
import axiosInstance from '@/services/axios/axios-instance';

import {
  CompanyFormData,
} from '@/components/CompanyForm/interfaces/company-form-data.interface';
import {
  CompanyFormProps,
} from '@/components/CompanyForm/interfaces/company-form-props.interface';

const schema = yup.object().shape({
  name: yup.string().required('Nome da empresa é obrigatório'),
  description: yup.string().required('Descrição é obrigatória'),
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  cnpj: yup
    .string()
    .min(14, 'CNPJ deve possuir 14 dígitos')
    .required('CNPJ é obrigatório'),
  address: yup.object().shape({
    street: yup.string().required('Rua é obrigatória'),
    number: yup.number().required('Número é obrigatório'),
    neighborhood: yup.string().required('Bairro é obrigatório'),
    city: yup.string().required('Cidade é obrigatória'),
    state: yup
      .string()
      .oneOf(
        [
          'AC',
          'AL',
          'AP',
          'AM',
          'BA',
          'CE',
          'DF',
          'ES',
          'GO',
          'MA',
          'MT',
          'MS',
          'MG',
          'PA',
          'PB',
          'PR',
          'PE',
          'PI',
          'RJ',
          'RN',
          'RS',
          'RO',
          'RR',
          'SC',
          'SP',
          'SE',
          'TO',
        ],
        'Estado inválido',
      )
      .required('Estado é obrigatório'),
    zip: yup
      .string()
      .min(8, 'CEP precisa ter 8 dígitos')
      .required('CEP é obrigatório'),
  }),
});

export default function CompanyForm({
  finishedCompanyCreation,
}: CompanyFormProps) {
  const toast = useToast();
  const {
    state: { userId },
  } = useUser();
  const [isRegistering, setIsRegistering] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const zip = watch('address.zip');
  const { isUpdatingAddress, address, error } = useAddress(zip);

  const onSubmit = (data: CompanyFormData) => {
    setIsRegistering(true);

    const companyData = {
      ...data,
      adminId: userId,
    };
    axiosInstance
      .post('/company', companyData)
      .then(() => {
        finishedCompanyCreation();
      })
      .catch(() => {
        showRegistrationErrorToast();
        setIsRegistering(false);
      });
  };

  const showAddressRequestError = useCallback(() => {
    toast({
      title: 'Ocorreu um erro ao tentar buscar o endereço',
      status: 'error',
      duration: 3000,
      isClosable: false,
    });
  }, [toast]);

  useEffect(() => {
    if (address) {
      setValue('address.street', address.street);
      setValue('address.neighborhood', address.neighborhood);
      setValue('address.city', address.city);
      setValue('address.state', address.state);
    }

    if (error) {
      showAddressRequestError();
    }
  }, [address, error, setValue, showAddressRequestError]);

  const showRegistrationErrorToast = useCallback(() => {
    toast({
      title: 'Ocorreu um erro ao tentar criar a empresa',
      status: 'error',
      duration: 3000,
      isClosable: false,
    });
  }, [toast]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
        Registro da empresa
      </Heading>
      <FormControl mr="5%" isRequired>
        <FormLabel htmlFor="company-name" fontWeight={'normal'}>
          Nome da Empresa
        </FormLabel>
        <InputGroup>
          <InputLeftElement>
            <BsBuildings />
          </InputLeftElement>
          <Input
            {...register('name')}
            id="company-name"
            placeholder="Nome da empresa"
          />
        </InputGroup>
        <FormHelperText>{errors.name?.message}</FormHelperText>
      </FormControl>

      <FormControl mt="2%" isRequired>
        <FormLabel htmlFor="cnpj" fontWeight={'normal'}>
          CNPJ da empresa
        </FormLabel>
        <InputGroup>
          <InputLeftElement>
            <BsJournalText />
          </InputLeftElement>
          <Input {...register('cnpj')} id="cnpj" placeholder="CNPJ" />
        </InputGroup>
        <FormHelperText>{errors.cnpj?.message}</FormHelperText>
      </FormControl>

      <FormControl mt="2%" isRequired>
        <FormLabel htmlFor="email" fontWeight={'normal'}>
          Email da empresa
        </FormLabel>
        <InputGroup>
          <InputLeftElement>
            <EmailIcon />
          </InputLeftElement>
          <Input
            {...register('email')}
            id="email"
            type="email"
            placeholder="Email"
          />
        </InputGroup>
        <FormHelperText>Email oficial da empresa.</FormHelperText>
        <FormHelperText>{errors.email?.message}</FormHelperText>
      </FormControl>

      <FormControl isRequired mt="2%">
        <FormLabel>Descrição</FormLabel>

        <Textarea
          {...register('description')}
          placeholder="Descrição da empresa"
          rows={6}
          resize="none"
        />
        <FormHelperText>{errors.description?.message}</FormHelperText>
      </FormControl>

      <Stack direction={'column'} mt="2%" spacing={'1.5'}>
        <Text>Localização da empresa</Text>
        <FormControl isRequired mt="2%">
          <FormLabel htmlFor="zip" fontWeight={'normal'}>
            CEP
          </FormLabel>
          <InputGroup>
            <InputRightElement>
              {isUpdatingAddress && <Spinner size="sm" />}
            </InputRightElement>
            <Input {...register('address.zip')} id="zip" placeholder="CEP" />
          </InputGroup>
          <FormHelperText>{errors.address?.zip?.message}</FormHelperText>
        </FormControl>

        <FormControl isRequired mt="2%">
          <FormLabel htmlFor="street" fontWeight={'normal'}>
            Rua
          </FormLabel>
          <Input
            {...register('address.street')}
            id="street"
            placeholder="Rua"
          />
          <FormHelperText>{errors.address?.street?.message}</FormHelperText>
        </FormControl>

        <FormControl isRequired mt="2%">
          <FormLabel htmlFor="number" fontWeight={'normal'}>
            Número
          </FormLabel>
          <Input
            {...register('address.number')}
            id="number"
            placeholder="Número"
          />
          <FormHelperText>{errors.address?.number?.message}</FormHelperText>
        </FormControl>

        <FormControl isRequired mt="2%">
          <FormLabel htmlFor="neighborhood" fontWeight={'normal'}>
            Bairro
          </FormLabel>
          <Input
            {...register('address.neighborhood')}
            id="neighborhood"
            placeholder="Bairro"
          />
          <FormHelperText>
            {errors.address?.neighborhood?.message}
          </FormHelperText>
        </FormControl>

        <FormControl isRequired mt="2%">
          <FormLabel htmlFor="city" fontWeight={'normal'}>
            Cidade
          </FormLabel>
          <Input {...register('address.city')} id="city" placeholder="Cidade" />
          <FormHelperText>{errors.address?.city?.message}</FormHelperText>
        </FormControl>

        <FormControl isRequired mt="2%">
          <FormLabel htmlFor="state" fontWeight={'normal'}>
            Estado
          </FormLabel>
          <Input
            {...register('address.state')}
            id="state"
            placeholder="Estado"
          />
          <FormHelperText>{errors.address?.state?.message}</FormHelperText>
        </FormControl>
      </Stack>

      <Flex mt="10%" justify={'center'}>
        <Button
          type="submit"
          w="100%"
          colorScheme={'green'}
          variant="solid"
          isDisabled={!isValid || isRegistering}
          isLoading={isRegistering}
          loadingText="Cadastrando..."
        >
          Cadastrar empresa
        </Button>
      </Flex>
    </form>
  );
}
