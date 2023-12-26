import { useCallback, useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { BsBuildings } from 'react-icons/bs';

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
import { CompanyTypes } from '@/hooks/company/types/company-actions.types';
import { useCompany } from '@/hooks/company/useCompany';
import {
  useUpdateCompanySchema,
} from '@/hooks/validations/update-company/useUpdateCompanySchema';
import { useUpdateCompany } from '@/services/company-update/useCompanyUpdate';

import {
  UpdateCompanyFormData,
// eslint-disable-next-line max-len
} from '@/components/Forms/UpdateCompanyForm/interface/update-company-form-data';

export default function UpdateCompanyForm() {
  const router = useRouter();
  const toast = useToast();
  const updateCompanySchema = useUpdateCompanySchema();
  const { updateCompany, isUpdatingCompany, requestError, updatedCompanyData } =
    useUpdateCompany();
  const {
    dispatch,
    state: { company },
  } = useCompany();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(updateCompanySchema),
    mode: 'onChange',
  });

  const zip = watch('address.zip');
  const { isUpdatingAddress, address, error } = useAddress(zip);

  const onSubmit = async (data: UpdateCompanyFormData) => {
    if (company?.id) {
      await updateCompany(company.id, data);
    }
  };

  useEffect(() => {
    if (company) {
      setValue('name', company.name);
      setValue('description', company.description);
      setValue('address.zip', company.address.zip);
      setValue('address.street', company.address.street);
      setValue('address.neighborhood', company.address.neighborhood);
      setValue('address.city', company.address.city);
      setValue('address.state', company.address.state);
      setValue('address.number', company.address.number.toString());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company?.id]);

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

  const showUpdateErrorToast = useCallback(() => {
    toast({
      title: 'Ocorreu um erro ao tentar criar a empresa',
      status: 'error',
      duration: 3000,
      isClosable: false,
    });
  }, [toast]);

  const handleUpdateSuccess = useCallback(() => {
    toast({
      title: 'Empresa atualizada com sucesso',
      status: 'success',
      duration: 3000,
      isClosable: false,
    });

    router.push('/dashboard');
  }, [toast, router]);

  useEffect(() => {
    if (updatedCompanyData) {
      dispatch({
        type: CompanyTypes.SET_COMPANY,
        payload: {
          company: updatedCompanyData,
        },
      });
      handleUpdateSuccess();
    }
  }, [updatedCompanyData, dispatch, handleUpdateSuccess]);

  useEffect(() => {
    if (requestError) {
      showUpdateErrorToast();
    }
  }, [requestError, showUpdateErrorToast]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
        Atualizar empresa
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
          isDisabled={!isValid || isUpdatingCompany}
          isLoading={isUpdatingCompany}
          loadingText="Atualizando..."
        >
          Atualizar empresa
        </Button>
      </Flex>
    </form>
  );
}
