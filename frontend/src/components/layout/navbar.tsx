import { Box, Button, Flex, IconButton, Image, Link } from '@chakra-ui/react';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BiMessageAltDetail } from 'react-icons/bi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useSelector } from 'react-redux';
import NextLink from 'next/link';

import useAuth from '@/hooks/use-auth';
import { selectUser } from '@/redux/slices/user.slice';

const navLinks = [
  { name: 'About', path: '#' },
  { name: 'Features', path: '#' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector(selectUser);
  const { logout } = useAuth();

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Box as="nav" px="4" bg="background.light" boxShadow="sm">
      <Flex h="16" alignItems="center" justifyContent="space-between" mx="auto">
        <NextLink href="/">
          <Image w="150px" h="50px" src="/genius-logo.png" alt="Genius Logo" />
        </NextLink>

        <Flex display={{ base: 'none', md: 'flex' }} gap="8">
          {navLinks.map((link, index) => (
            <NavLink key={index} {...link} />
          ))}
        </Flex>

        {user.email ? (
          <Flex display={{ base: 'none', md: 'flex' }} gap="4">
            <NextLink href="/profile">
              <Button variant="outline" colorScheme="primary">
                Profile
              </Button>
            </NextLink>

            <Button variant="outline" colorScheme="accent" onClick={logout}>
              Sign out
            </Button>
          </Flex>
        ) : (
          <Flex display={{ base: 'none', md: 'flex' }} gap="4">
            <NextLink href="/session/login">
              <Button variant="outline" colorScheme="accent">
                Login
              </Button>
            </NextLink>
            <NextLink href="/session/register">
              <Button colorScheme="accent">Sign Up</Button>
            </NextLink>
          </Flex>
        )}

        <IconButton
          display={{ md: 'none' }}
          aria-label="Toggle Menu"
          onClick={toggle}
          icon={isOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
        />
      </Flex>

      <Box
        display={{ md: 'none' }}
        transition="all 0.5s ease-in-out"
        transform={isOpen ? 'translateX(0)' : 'translateX(100%)'}
        opacity={isOpen ? '1' : '0'}
      >
        <Flex direction="column" pt="2" pb="3" gap="1">
          {navLinks.map((link, index) => (
            <NavLink key={index} {...link} />
          ))}
        </Flex>
      </Box>
    </Box>
  );
}

type NavLinkProps = {
  name: string;
  path: string;
};

function NavLink({ name, path }: NavLinkProps) {
  return (
    <NextLink href={path}>
      <Link
        as={Button}
        variant="ghost"
        colorScheme="accent"
        _hover={{ bg: 'primary.400', color: 'white' }}
      >
        {name}
      </Link>
    </NextLink>
  );
}
