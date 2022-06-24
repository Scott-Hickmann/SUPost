import { ChevronDownIcon, CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Button,
  chakra,
  Flex,
  HStack,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { signIn, signOut, useSession } from 'next-auth/react';
import React, { ReactElement } from 'react';

type NavLinkWrapperProps = React.PropsWithChildren<{
  href: string;
  active: boolean;
}>;

type NavLinkProps = React.PropsWithChildren<{
  href: string;
}>;

const routes = [
  { title: 'Home', link: '/' },
  { title: 'Sell', link: '/addItem' },
  { title: 'Buy', link: '/items' }
] as const;

function NavLinkWrapper({
  href,
  active,
  children
}: NavLinkWrapperProps): ReactElement {
  if (active) return <>{children}</>;
  return (
    <NextLink href={href} passHref>
      {children}
    </NextLink>
  );
}

function NavLink({ href, children }: NavLinkProps): ReactElement {
  const router = useRouter();

  const url = new URL(`https://supost.com${href}`);
  const active = url.pathname === router.pathname;

  const activeBgColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <NavLinkWrapper href={href} active={active}>
      <Link
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
          textDecoration: 'none',
          bg: useColorModeValue('gray.200', 'gray.700')
        }}
        background={active ? activeBgColor : 'none'}
      >
        {children}
      </Link>
    </NavLinkWrapper>
  );
}

export default function Navigation(): ReactElement {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      px={4}
      borderBottomWidth={2}
      borderBottomColor={useColorModeValue('gray.200', 'gray.900')}
      position="sticky"
      top={0}
      width="full"
      zIndex={999}
    >
      <HStack h={16} align="center" justify="space-between" spacing={4}>
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack
          as={'nav'}
          width="full"
          spacing={4}
          display={{ base: 'none', md: 'flex' }}
        >
          {routes.map(({ title, link }) => (
            <NavLink key={title} href={link}>
              {title}
            </NavLink>
          ))}
        </HStack>
        <Flex alignItems="center" fontSize={{ base: 'sm', md: 'md' }}>
          <HStack spacing={4}>
            <Button aria-label="Toggle color mode" onClick={toggleColorMode}>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
            {session ? (
              <Menu>
                <MenuButton
                  as={Button}
                  variant="link"
                  cursor="pointer"
                  colorScheme="black"
                  minW={0}
                >
                  <HStack>
                    <Avatar
                      size="sm"
                      name={user?.name ?? 'Anonymous'}
                      src={user?.image ?? undefined}
                    />
                    <Text whiteSpace="nowrap">{user?.name ?? 'Anonymous'}</Text>
                    <Box display={{ base: 'none', lg: 'flex' }}>
                      <ChevronDownIcon />
                    </Box>
                  </HStack>
                </MenuButton>
                <MenuList p={0}>
                  <MenuItem color="red.500" onClick={() => signOut()}>
                    Sign Out
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Button colorScheme="red" onClick={() => signIn('google')}>
                Sign In&nbsp;
                <chakra.span fontSize="xs">(@stanford.edu)</chakra.span>
              </Button>
            )}
          </HStack>
        </Flex>
      </HStack>
      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            {routes.map(({ title, link }) => (
              <NavLink key={title} href={link}>
                {title}
              </NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
