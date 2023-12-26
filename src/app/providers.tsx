'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import { AuthProvider } from '@/hooks/authentication/useAuthentication';
import { CompanyProvider } from '@/hooks/company/useCompany';
import { EmployeeProvider } from '@/hooks/employee/useEmployee';
import {
  EmployeeAvailabilityProvider,
} from '@/hooks/employee-availability/useEmployeeAvailability';
import { UserProvider } from '@/hooks/user/useUser';

const theme = extendTheme({
  fonts: {
    heading: '\'Work Sans\', sans-serif',
    body: '\'Raleway\', sans-serif',
  },
});

const providers = [
  { provider: CacheProvider, props: {} },
  { provider: ChakraProvider, props: { theme } },
  { provider: UserProvider, props: {} },
  { provider: CompanyProvider, props: {} },
  { provider: EmployeeProvider, props: {} },
  { provider: EmployeeAvailabilityProvider, props: {}},
  { provider: AuthProvider, props: {} },
];

export function Providers({ children }: { children: React.ReactNode }) {
  return providers.reduce((prev, { provider: Provider, props }) => {
    return <Provider {...props}>{prev}</Provider>;
  }, children);
}
