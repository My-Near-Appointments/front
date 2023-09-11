'use client';

import { BsBuildings, BsPerson } from 'react-icons/bs';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react';
import { EmailIcon } from '@chakra-ui/icons';

export default function Registration() {
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
        w={{ base: 'full', md: 'md' }}
        p={10}
        spacing={8}
        align={'center'}
      >
        <Heading
          fontSize={{
            base: '4xl',
            md: '5xl',
          }}
        >
          Cadastre-se
        </Heading>
        <Stack spacing={3}>
          <FormControl isRequired>
            <FormLabel>Nome</FormLabel>
            <InputGroup pointerEvents="none">
              <InputLeftElement>
                <BsPerson />
              </InputLeftElement>
              <Input placeholder="Seu nome" size="md" />
            </InputGroup>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <InputGroup pointerEvents="none">
              <InputLeftElement>
                <EmailIcon />
              </InputLeftElement>
              <Input placeholder="Seu e-mail" size="md" />
            </InputGroup>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>CNPJ</FormLabel>
            <InputGroup pointerEvents="none">
              <InputLeftElement>
                <BsBuildings />
              </InputLeftElement>
              <Input type="number" placeholder="Seu CNPJ" size="md" />
            </InputGroup>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>CNPJ</FormLabel>
            <InputGroup pointerEvents="none">
              <InputLeftElement>
                <BsBuildings />
              </InputLeftElement>
              <Input type="number" placeholder="Seu CNPJ" size="md" />
            </InputGroup>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Descrição</FormLabel>

            <Textarea
              name="description"
              placeholder="Descrição da empresa"
              rows={6}
              resize="none"
            />
          </FormControl>
          <Button>Realizar cadastro</Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
