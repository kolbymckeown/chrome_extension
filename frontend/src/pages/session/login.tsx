import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Image,
  useToast,
  Stack,
  Icon,
} from '@chakra-ui/react';
import { Layout } from '@/components/layout';
import useAuth from '@/hooks/use-auth';
import { FcGoogle } from 'react-icons/fc';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});
export default function RegisterPage() {
  const { signInWithEmailAndPassword, signInWithGoogle } = useAuth();
  const toast = useToast();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle(false);
    } catch (error) {
      console.error('Failed to sign in with Google', error);
    }
  };

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      await signInWithEmailAndPassword(data.email, data.password);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: 'Error',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Error',
          description: 'An unknown error occurred.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Layout seoTranslationKey="register">
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
          <Heading mb={6}>Register</Heading>
          <form onSubmit={handleSubmit(onSubmit)}>
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
              <Button onClick={handleGoogleSignIn}>
                <Icon as={FcGoogle} mr={2} />
                Sign in with Google
              </Button>
            </Stack>
          </form>
        </Flex>
      </Stack>
    </Layout>
  );
}
