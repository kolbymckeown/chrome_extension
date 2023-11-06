import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  HStack,
  Avatar,
  Image,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

import useAuth from '@/hooks/use-auth';
import { selectUser } from '@/redux/slices/user.slice';
import { AddItem } from '../items/add-item';
import { AddCategory } from '../categories/add-category';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const user = useSelector(selectUser);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { pathname } = useLocation();

  const isLoginPage = pathname === '/session/login';

  const handleLogout = async () => {
    navigate('/session/login');
    await logout();
  };

  return (
    <Box bg="scheme.dusty-rose" px={4} shadow="lg">
      <Flex h="20" alignItems="center" justifyContent="space-between">
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems="center">
          <Link to="/">
            <Image
              w="150px"
              h="60px"
              src="/genius-modern.png"
              alt="Genius Logo"
            />
          </Link>
          {user.email && (
            <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
              <AddItem />
              <AddCategory />
            </HStack>
          )}
        </HStack>
        <Flex alignItems="center">
          {user.email ? (
            <Button
              onClick={handleLogout}
              color="scheme.dusty-rose"
              borderColor="scheme.dusty-rose"
              borderWidth={1}
              bg="white"
              _hover={{
                bg: 'scheme.dusty-rose',
                color: 'white',
                border: '1px solid white',
              }}
              boxShadow="3px 3px pink"
            >
              Sign out
            </Button>
          ) : (
            !isLoginPage && (
              <Link to="/session/login">
                <Button color="scheme.main-green-blue">Login</Button>
              </Link>
            )
          )}
        </Flex>
      </Flex>

      {isOpen && (
        <Box pb={4} display={{ md: 'none' }}>
          <HStack as="nav" spacing={4}>
            <AddItem />
            <AddCategory />
          </HStack>
        </Box>
      )}
    </Box>
  );
}
