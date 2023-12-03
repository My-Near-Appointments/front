'use client';

import {
  Flex,
  Skeleton,
  SkeletonText,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';

export default function DashboardLoading() {
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
        rounded={'xl'}
        p={10}
        align={'center'}
        boxShadow="sm"
        bg={useColorModeValue('white', 'gray.700')}
        spacing={4}
      >
        <Skeleton height="50px" w={'25%'} />
        <SkeletonText mt="4" noOfLines={1} spacing="4" skeletonHeight="2" />
        <Skeleton height="35px" w={'100%'} />
        <Skeleton height="35px" w={'100%'} />
        <Skeleton height="35px" w={'20%'} />
      </Stack>
    </Flex>
  );
}