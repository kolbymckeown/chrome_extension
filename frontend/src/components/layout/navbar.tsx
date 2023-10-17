import {
  Box,
  Button,
  Flex,
  Image,
  Icon,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import NextLink from 'next/link';

import useAuth from '@/hooks/use-auth';
import { selectUser } from '@/redux/slices/user.slice';
import { AddItem } from '../items/add-item';
import { AddCategory } from '../categories/add-category';
import { FaSignOutAlt } from 'react-icons/fa';
import { useRouter } from 'next/router';

export default function Navbar() {
  const user = useSelector(selectUser);
  const { logout } = useAuth();
  const router = useRouter();
  const isLoginPage = router.pathname.includes('login');
  return (
    <Box as="nav" px="4" bg="scheme.main-green-blue" boxShadow="sm">
      <Flex h="20" alignItems="center" justifyContent="space-between" mx="auto">
        <NextLink href="/">
          <Image w="150px" h="50px" src="/genius-logo.png" alt="Genius Logo" />
        </NextLink>
        {user.email ? (
          <>
            <Flex display={{ base: 'none', md: 'flex' }} gap="4">
              <AddItem />
              <AddCategory />
              {user?.firstName && <Text>Welcome, {user.firstName}.</Text>}

              <Button
                variant="outline"
                color="scheme.dark-blue"
                onClick={logout}
                border="none"
                rightIcon={<FaSignOutAlt />}
              >
                Sign out
              </Button>
            </Flex>
            <Flex display={{ base: 'flex', md: 'none' }} gap="8">
              <AddItem variant="icon" />
              <AddCategory variant="icon" />
              <Tooltip label="Sign Out" aria-label="Sign Out">
                <span>
                  <Icon
                    as={FaSignOutAlt}
                    variant="outline"
                    color="scheme.dark-blue"
                    onClick={logout}
                    border="none"
                    cursor={'pointer'}
                    w={6}
                    h={6}
                  />
                </span>
              </Tooltip>
            </Flex>
          </>
        ) : isLoginPage ? (
          <Text>Welcome to Genius</Text>
        ) : (
          <Flex display={{ base: 'none', md: 'flex' }} gap="4">
            <NextLink href="/session/login">
              <Button variant="outline" colorScheme="accent">
                Login
              </Button>
            </NextLink>
          </Flex>
        )}
      </Flex>
    </Box>
  );
}
