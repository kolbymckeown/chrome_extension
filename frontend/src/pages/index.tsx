import useAuth from '@/hooks/use-auth';
import { Button } from '@chakra-ui/react';

export default function Home() {
  const {
    createAccountWithEmailAndPassword,
    signInWithEmailAndPassword,
    logout,
  } = useAuth();

  return (
    <>
      <Button
        onClick={() => {
          createAccountWithEmailAndPassword(
            'test@test.com',
            'Tester123',
            'Kolby',
            'McKeown'
          );
        }}
        colorScheme="primary"
      >
        Create User
      </Button>
      <Button
        onClick={() => signInWithEmailAndPassword('test@test.com', 'Tester123')}
        colorScheme="accent"
      >
        Sign In
      </Button>
      <Button onClick={() => logout()} colorScheme="success">
        Logout
      </Button>
    </>
  );
}
