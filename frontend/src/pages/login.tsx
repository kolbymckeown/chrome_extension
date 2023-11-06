import React from 'react';
import * as yup from 'yup';
import { Flex, Heading, Button, Image, Stack, Icon } from '@chakra-ui/react';

import useAuth from '@/hooks/use-auth';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});
export default function RegisterPage() {
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate('/');
    } catch (error) {
      console.error('Failed to sign in with Google', error);
    }
  };

  // deprecated sign-in method
  // const onSubmit = async (data: { email: string; password: string }) => {
  //   try {
  //     await signInWithEmailAndPassword(data.email, data.password);
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       toast({
  //         title: 'Error',
  //         description: error.message,
  //         status: 'error',
  //         duration: 5000,
  //         isClosable: true,
  //       });
  //     } else {
  //       toast({
  //         title: 'Error',
  //         description: 'An unknown error occurred.',
  //         status: 'error',
  //         duration: 5000,
  //         isClosable: true,
  //       });
  //     }
  //   }
  // };

  return (
    <Stack
      minHeight="100%"
      flex={1}
      direction={{ base: 'column-reverse', md: 'row' }}
    >
      <Flex flex={1}>
        <Image
          objectFit="contain"
          src="/genius-modern-dark.png"
          alt="Genius Logo"
        />
      </Flex>
      <Flex
        w={['100%', '100%', '50%']}
        p={8}
        justify="center"
        direction="column"
      >
        <Heading
          mb={6}
          fontWeight={'700'}
          textShadow={'3px 3px #ead2ce'}
          color="scheme.dusty-rose"
        >
          Login/Register
        </Heading>
        <Button
          onClick={handleGoogleSignIn}
          color="scheme.dusty-rose"
          borderColor="scheme.dusty-rose"
          borderWidth={1}
          bg="white"
          _hover={{
            bg: 'scheme.dusty-rose',
            color: 'white',
            // boxShadow: '3px 3px #4c8d99',
          }}
          boxShadow="3px 3px pink"
        >
          <Icon as={FcGoogle} mr={2} />
          Sign in with Google
        </Button>
      </Flex>
    </Stack>
  );
}
