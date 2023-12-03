'use client';

import { useCallback, useMemo } from 'react';

import Link from 'next/link';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';

import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
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
  Image,
} from '@chakra-ui/react';

import { AuthTypes } from '@/hooks/authentication/types/auth-actions.types';
import { useAuthentication } from '@/hooks/authentication/useAuthentication';
import { useUser } from '@/hooks/user/useUser';

import { getMenuLinks } from '@/components/Header/utils/menu-links';
import NavLink from '@/components/NavLink/NavLink';

export default function Header() {
  const {
    state: { user },
    isCompanyAdmin,
  } = useUser();
  const {
    state: { isAuthenticated },
    dispatch,
  } = useAuthentication();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();

  const Links = getMenuLinks(isCompanyAdmin);

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
                  <Image src="/logo.png" alt="Company Logo" boxSize={'12'} />
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
                {Links.map((item) => (
                  <NavLink key={item.link} href={item.link}>
                    {item.name}
                  </NavLink>
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
                    <Avatar size={'sm'} name={user?.username} />
                  </MenuButton>
                  <MenuList>
                    <MenuItem as={NextLink} href='/my-profile'>
                      Meu Perfil
                    </MenuItem>
                    {isCompanyAdmin && (
                      <>
                        <MenuItem as={NextLink} href='my-company'>
                          Minha Barbearia
                        </MenuItem>
                      </>
                    )}
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
              {Links.map((item) => (
                <NavLink key={item.link} href={item.link}>
                  {item.name}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
