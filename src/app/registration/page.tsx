'use client';

import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  useToast,
  useColorModeValue,
} from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { useCallback, useState } from 'react';
import CompanyForm from '@/components/CompanyForm/CompanyForm';
import UserForm from '@/components/UserForm/UserForm';

export default function Registration() {
  const toast = useToast();
  const [step, setStep] = useState(1);

  const handleSubmit = useCallback(() => {
    toast({
      title: 'Conta criada com sucesso.',
      description: 'A criação da conta foi feita com sucesso.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  }, [toast]);

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
        {step === 1 ? <UserForm /> : <CompanyForm />}
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <Button
                colorScheme={'green'}
                leftIcon={<ArrowBackIcon />}
                onClick={() => {
                  setStep(step - 1);
                }}
                isDisabled={step === 1}
                variant="outline"
                w="7rem"
                mr="5%"
              >
                Voltar
              </Button>
              <Button
                colorScheme={'green'}
                rightIcon={<ArrowForwardIcon />}
                w="7rem"
                isDisabled={step === 2}
                onClick={() => {
                  setStep(step + 1);
                }}
                variant="outline"
              >
                Avançar
              </Button>
            </Flex>
          </Flex>
        </ButtonGroup>
      </Box>
    </Flex>
  );
}
