'use client';

import { Box, Flex, useColorModeValue } from '@chakra-ui/react';

import
UpdateCompanyForm
from '@/components/Forms/UpdateCompanyForm/UpdateCompanyForm';

export default function MyCompany() {
  return (
    <Flex bg={useColorModeValue('gray.50', 'gray.800')}>
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
        <UpdateCompanyForm />
      </Box>
    </Flex>
  );
}
