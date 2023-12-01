'use client';

import {
  Box,
  Heading,
  useColorModeValue,
  Text,
  Link,
  Stack,
  Container,
} from '@chakra-ui/react';

import LoginForm from '@/components/LoginForm/LoginForm';

export default function Login() {
  return (
    <Container
      maxW="lg"
      py={{ base: '12', md: '24' }}
      px={{ base: '0', sm: '8' }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading size={{ base: 'xs', md: 'sm' }}>
              Faça login na sua conta
            </Heading>
            <Text color="fg.muted">
              Ainda não tem uma conta?{' '}
              <Link href="/registration">Cadastre-se</Link>
            </Text>
          </Stack>
        </Stack>
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={useColorModeValue('white', 'gray.700')}
          borderWidth="1px"
          rounded="md"
          boxShadow="sm"
        >
          <LoginForm />
        </Box>
      </Stack>
    </Container>
  );
}
