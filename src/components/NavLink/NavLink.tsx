import NextLink from 'next/link';

import { Box, useColorModeValue } from '@chakra-ui/react';

interface NavLinkProps {
  children: React.ReactNode;
  href: string;
}

export default function NavLink(props: NavLinkProps) {
  const { children, href } = props;

  return (
    <Box
      as={NextLink}
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      href={href}
    >
      {children}
    </Box>
  );
}
