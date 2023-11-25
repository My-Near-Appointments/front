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
} from '@chakra-ui/react';
import { BsBuildings, BsJournalText } from 'react-icons/bs';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  companyName: yup.string().required('Nome da empresa é obrigatório'),
  cnpj: yup.string().required('CNPJ é obrigatório'),
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  description: yup.string().required('Descrição é obrigatória'),
});

interface FormData {
  companyName: string;
  cnpj: string;
  email: string;
  description: string;
}

export default function CompanyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => console.log(data);

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
          <Input {...register('companyName')} id="company-name" placeholder="Nome da empresa" />
        </InputGroup>
        <FormHelperText>{errors.companyName?.message}</FormHelperText>
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
          <Input {...register('email')} id="email" type="email" placeholder="Email" />
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
    </form>
  );
}
