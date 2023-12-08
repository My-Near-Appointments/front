'use client';

import { useEffect } from 'react';

import Link from 'next/link';

import {
  Flex,
  Heading,
  Stack,
  useColorModeValue,
  Text,
  Image,
  Button,
} from '@chakra-ui/react';

import { useCompany } from '@/hooks/company/useCompany';
import { UserRole } from '@/hooks/user/interfaces/user-state.interface';
import { useUser } from '@/hooks/user/useUser';
import { useUserMe } from '@/services/user-me/useUserMe';

export default function Dashboard() {
  const { getUserMe } = useUserMe();
  const { getCompany } = useCompany();
  const { isCompanyAdmin, state: { user } } = useUser();

  useEffect(() => {
    getUserMe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user?.id && user.role === UserRole.COMPANY_ADMIN) {
      getCompany(user?.id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  return (
    <Flex
      w="100%"
      h={'calc(100vh - 64px)'}
      align="center"
      justify="center"
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack
        w="100%"
        maxW="700px"
        boxShadow="sm"
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        p={10}
        spacing={8}
        align={'center'}
      >
        <Image src="/schedule.png" alt="scheduler" w="24" h="24"></Image>
        <Heading
          fontSize={'3xl'}
          color={useColorModeValue('gray.800', 'gray.200')}
        >
          {isCompanyAdmin
            ? 'Organize sua barbearia'
            : 'Realize agendamentos com sua barbearia favorita'}
        </Heading>

        <Text fontSize={'md'} color={'gray.500'}>
          {isCompanyAdmin
            ? 'Organize seus serviços e agendamentos'
            : 'Realize agendamentos com seus prestadores de serviço'}
        </Text>

        <Button
          colorScheme="green"
          bg="green.400"
          variant={'solid'}
          rounded={'full'}
        >
          <Link href="/appointments">Iniciar</Link>
        </Button>
      </Stack>
    </Flex>
  );
}
