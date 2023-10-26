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
        <Image alt="shopping bag" objectFit="cover" src="/shopping-bag.jpg" />
      </Flex>
      <Flex
        w={['100%', '100%', '50%']}
        p={8}
        justify="center"
        direction="column"
      >
        <Heading mb={6}>Login/Register with Google</Heading>
        {/* <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter your email"
                    />
                  )}
                />
                <p>{errors.email?.message}</p>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter your password"
                    />
                  )}
                />
                <p>{errors.password?.message}</p>
              </FormControl>{' '}
              <Button mt={6} colorScheme="primary" type="submit" width="full">
                Login
              </Button>
              
            </Stack>
          </form> */}
        <Button onClick={handleGoogleSignIn}>
          <Icon as={FcGoogle} mr={2} />
          Sign in with Google
        </Button>
      </Flex>
    </Stack>
  );
}
