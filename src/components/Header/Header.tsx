'use client';

import { useCallback, useMemo } from 'react';

import { useRouter } from 'next/navigation';

import {
  HamburgerIcon,
  CloseIcon,
  MoonIcon,
  SunIcon,
  CalendarIcon,
} from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  useColorModeValue,
  useDisclosure,
  Text,
  useColorMode,
  Link,
} from '@chakra-ui/react';

import { AuthTypes } from '@/hooks/authentication/types/auth-actions.types';
import { useAuthentication } from '@/hooks/authentication/useAuthentication';

import NavLink from '@/components/NavLink/NavLink';

const Links = ['Agendamentos', 'Histórico', 'Empregados'];

export default function Header() {
  const {
    state: { isAuthenticated },
    dispatch,
  } = useAuthentication();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();

  const handleNavigateToMyProfile = useCallback(() => {
    router.push('/dashboard/my-profile');
  }, [router]);

  const logout = useCallback(() => {
    dispatch({ type: AuthTypes.LOGOUT });
    router.push('/');
  }, [router, dispatch]);

  const getLinkForCompanyHeader = useMemo(() => {
    return isAuthenticated ? '/dashboard' : '/';
  }, [isAuthenticated]);

  return (
    <>
      <Box bg={useColorModeValue('white.100', 'gray.900')} px={4}>
        <Flex
          h={16}
          alignItems={'center'}
          justifyContent={'space-between'}
          borderBottom={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.900')}
        >
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Text as={'b'} fontFamily={'heading'}>
              <Link href={getLinkForCompanyHeader}>
                <Stack direction={'row'} justify={'center'} align={'center'}>
                  <CalendarIcon color={'green.400'} />
                  <Box>My Near Appointments</Box>
                </Stack>
              </Link>
            </Text>
            {isAuthenticated ? (
              <HStack
                as={'nav'}
                spacing={4}
                display={{ base: 'none', md: 'flex' }}
              >
                {Links.map((link) => (
                  <NavLink key={link}>{link}</NavLink>
                ))}
              </HStack>
            ) : (
              <></>
            )}
          </HStack>
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
              {isAuthenticated ? (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={'full'}
                    variant={'link'}
                    cursor={'pointer'}
                    minW={0}
                  >
                    <Avatar
                      size={'sm'}
                      name="John Doe"
                      src={
                        // eslint-disable-next-line max-len
                        'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                      }
                    />
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={handleNavigateToMyProfile}>
                      Meu Perfil
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem onClick={logout}>Sair</MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <></>
              )}
            </Stack>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
