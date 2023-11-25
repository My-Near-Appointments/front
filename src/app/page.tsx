'use client';

import { AuthTypes } from '@/hooks/authentication/types/auth-actions.types';
import { useAuthentication } from '@/hooks/authentication/useAuthentication';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export default function Home() {
  const { dispatch } = useAuthentication();
  const router = useRouter();

  const handleLogin = useCallback(() => {
    dispatch({ type: AuthTypes.LOGIN });
    router.push('/dashboard');
  }, [router, dispatch]);

  const goToRegistration = useCallback(() => {
    router.push('/registration');
  }, [router]);

  return (
    <Flex bg={useColorModeValue('gray.50', 'gray.800')} h="calc(100vh - 64px)">
      <Container maxW={'4xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          direction={'column'}
          spacing={6}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}
          >
            Cansado de planilhas? <br />
            <Text as={'span'} color={'green.400'}>
              Gerencie os agendamentos de sua barbearia.
            </Text>
          </Heading>

          <Text color={'white.500'}>
            Inicie agora e não se preocupe com problemas de agendamento. A
            gestão da sua barbearia irá ficar mais organizada!
          </Text>

          <Stack
            justifyContent={'center'}
            alignItems={'center'}
            flexDir={'column'}
            spacing={4}
            as={Flex}
          >
            <Button
              colorScheme={'green'}
              bg={'green.400'}
              rounded={'full'}
              px={6}
              _hover={{
                bg: 'green.500',
              }}
              onClick={goToRegistration}
            >
              Começar agora!
            </Button>
            <Button
              variant={'link'}
              colorScheme={'blue'}
              size={'sm'}
              onClick={handleLogin}
            >
              Login
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Flex>
  );
}
