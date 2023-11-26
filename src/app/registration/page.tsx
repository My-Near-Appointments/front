'use client';

import {
  Box,
  Flex,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import CompanyForm from '@/components/CompanyForm/CompanyForm';
import UserForm from '@/components/UserForm/UserForm';
import { useRouter } from 'next/navigation';

export default function Registration() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const toast = useToast();

  const changeStep = useCallback(() => {
    setStep(2);
  }, []);

  const showCompanyToast = useCallback(() => {
    toast({
      title: 'Usuário criado. Agora preencha informações sobre a empresa',
      status: 'success',
      duration: 3000,
      isClosable: false,
    });
  }, [toast]);

  const handleUserCreated = useCallback((isCompany: boolean) => {
    if (!isCompany) {
      router.push('/registration/finished-registration');
      return;
    }

    showCompanyToast();
    changeStep();
  }, [changeStep, router, showCompanyToast]);

  return (
    <Flex
      bg={useColorModeValue('gray.50', 'gray.800')}
      h={'calc(100vh - 64px)'}
    >
      <Box
        bg={useColorModeValue('white', 'gray.700')}
        borderWidth="1px"
        rounded="md"
        boxShadow="sm"
        maxWidth={900}
        width="100%"
        p={6}
        m="10px auto"
      >
        {step === 1 ? <UserForm onRegistrationComplete={handleUserCreated} /> : <CompanyForm />}
      </Box>
    </Flex>
  );
}
