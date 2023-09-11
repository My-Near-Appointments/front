'use client';

import {
  Flex,
  Heading,
  Stack,
  useColorModeValue,
  Text,
  Image,
  Button,
} from '@chakra-ui/react';

import Link from 'next/link';

export default function Dashboard() {
  return (
    <Flex
      w={'100vw'}
      h={'calc(100vh - 64px)'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack
        boxShadow={'2xl'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        p={10}
        spacing={8}
        align={'center'}
      >
        <Image src="/schedule.png" alt="scheduler" w={'24'} h={'24'}></Image>
        <Heading
          textTransform={'uppercase'}
          fontSize={'3xl'}
          color={useColorModeValue('gray.800', 'gray.200')}
        >
          Organize sua barbearia
        </Heading>

        <Text fontSize={'lg'} color={'gray.500'}>
          Comece adicionando seus prestadores de serviço e agendamentos.
        </Text>

        <Button colorScheme="blue" variant={'outline'} rounded={'full'}>
          <Link href="/dashboard/appointments">Iniciar</Link>
        </Button>
      </Stack>
    </Flex>
  );
}
