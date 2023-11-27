'use client';

import { AuthProvider } from '@/hooks/authentication/useAuthentication';
import { UserProvider } from '@/hooks/user/useUser';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: `'Work Sans', sans-serif`,
    body: `'Raleway', sans-serif`,
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <UserProvider>
          <AuthProvider>{children}</AuthProvider>
        </UserProvider>
      </ChakraProvider>
    </CacheProvider>
  );
}
