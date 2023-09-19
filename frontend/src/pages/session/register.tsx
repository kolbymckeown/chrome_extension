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
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  verifyPassword: yup
    .string()
    .required('Verify Password is required')
    .test('passwords-match', 'Passwords must match', function (value) {
      return this.parent.password === value;
    }),
});
export default function RegisterPage() {
  const { createAccountWithEmailAndPassword, signInWithGoogle } = useAuth();
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
      await signInWithGoogle(true);
      toast({
        title: 'Success',
        description: 'Account created successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Failed to sign in with Google', error);
    }
  };

  const onSubmit = async (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => {
    try {
      await createAccountWithEmailAndPassword(
        data.email,
        data.password,
        data.firstName,
        data.lastName
      );
      toast({
        title: 'Success',
        description: 'Account created successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
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
              <Flex direction={{ base: 'column', md: 'row' }} gap={4}>
                <FormControl isRequired flex="1">
                  <FormLabel>First Name</FormLabel>
                  <Controller
                    name="firstName"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Input {...field} type="text" placeholder="First Name" />
                    )}
                  />
                  <p>{errors.firstName?.message}</p>
                </FormControl>

                <FormControl isRequired flex="1">
                  <FormLabel>Last Name</FormLabel>
                  <Controller
                    name="lastName"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Input {...field} type="text" placeholder="Last Name" />
                    )}
                  />
                  <p>{errors.lastName?.message}</p>
                </FormControl>
              </Flex>
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
              <FormControl isRequired>
                <FormLabel>Verify Password</FormLabel>
                <Controller
                  name="verifyPassword"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="password"
                      placeholder="Verify your password"
                    />
                  )}
                />
                <p>{errors.verifyPassword?.message}</p>
              </FormControl>{' '}
              <Button mt={6} colorScheme="primary" type="submit" width="full">
                Register
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
