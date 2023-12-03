'use client';

import { Box, Flex, useColorModeValue } from '@chakra-ui/react';

import
UpdateProfileForm
from '@/components/UpdateProfileForm/UpdateProfileForm';

export default function MyProfile() {
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
        <UpdateProfileForm />
      </Box>
    </Flex>
  );
}
