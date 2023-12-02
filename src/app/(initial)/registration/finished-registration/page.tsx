'use client';

import { useCallback } from 'react';

import { useRouter } from 'next/navigation';

import {
  Box,
  Text,
  Stack,
  useColorModeValue,
  Heading,
  Button,
  Flex,
} from '@chakra-ui/react';

export default function FinishedRegistration() {
  const router = useRouter();

  const navigateToInitialPage = useCallback(() => {
    router.push('/');
  }, [router]);

  return (
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
      <Stack
        textAlign={'center'}
        direction={'column'}
        spacing={6}
        py={{ base: 20, md: 36 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: 'xl', sm: 'xl', md: 'xl' }}
          lineHeight={'110%'}
        >
          Cadastro realizado com sucesso! <br />
          <Text as={'span'} color={'green.400'}>
            Agora você pode fazer login na sua conta.
          </Text>
        </Heading>
        <Flex mt={4} justifyContent={'center'}>
          <Button
            colorScheme={'green'}
            bg={'green.400'}
            rounded={'full'}
            px={6}
            _hover={{
              bg: 'green.500',
            }}
            size={'md'}
            onClick={navigateToInitialPage}
          >
            Ir Para página inicial
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
}
