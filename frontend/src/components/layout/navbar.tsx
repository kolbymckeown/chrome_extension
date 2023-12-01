import {
  Box,
  Flex,
  IconButton,
  Button,
  useDisclosure,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Divider,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from '@chakra-ui/icons';

import useAuth from '@/hooks/use-auth';
import { selectUser } from '@/redux/slices/user.slice';
import { AddItem } from '../items/add-item';
import { AddCategory } from '../categories/add-category';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SearchComponent from './search';

export default function Navbar() {
  const user = useSelector(selectUser);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { pathname } = useLocation();

  const isLoginPage = pathname === '/session/login';
  const isPublicRoute = pathname.startsWith('/public');

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
          background={'white'}
          boxShadow={'3px 3px pink'}
          color={'scheme.dusty-rose'}
          border={'1px solid'}
          borderColor={'scheme.dusty-rose'}
          _hover={{
            bg: 'scheme.dusty-rose',
            color: 'white',
            border: '1px solid white',
          }}
        />
        <HStack spacing={8} alignItems="center">
          <Link to="/">
            <Image
              ml={5}
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
            <>
              {!isPublicRoute && <SearchComponent />}
              <Menu>
                <MenuButton
                  ml={1}
                  as={IconButton}
                  bg={'white'}
                  border={'1px solid'}
                  borderColor={'scheme.dusty-rose'}
                  boxShadow={'3px 3px pink'}
                  color={'scheme.dusty-rose'}
                  _hover={{
                    bg: 'scheme.dusty-rose',
                    color: 'white',
                    border: '1px solid white',
                  }}
                  icon={<ChevronDownIcon />}
                ></MenuButton>
                <MenuList>
                  <MenuItem
                    color={'scheme.main-green-blue'}
                    onClick={() => navigate('/')}
                  >
                    Home
                  </MenuItem>
                  <MenuItem
                    color={'scheme.main-green-blue'}
                    onClick={() => navigate('/account')}
                  >
                    Account
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    color={'scheme.main-green-blue'}
                    onClick={() => navigate('/contact')}
                  >
                    Contact us
                  </MenuItem>
                  <MenuItem
                    color={'scheme.main-green-blue'}
                    onClick={() => navigate('/session/terms')}
                  >
                    Terms of service
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    color={'scheme.main-green-blue'}
                    onClick={handleLogout}
                  >
                    Sign out
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
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
