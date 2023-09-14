import { Layout } from '@/components/layout';
import useAuth from '@/hooks/use-auth';
import { selectUser } from '@/redux/slices/user.slice';
import { Button } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

export default function Home() {
  const {
    createAccountWithEmailAndPassword,
    signInWithEmailAndPassword,
    logout,
  } = useAuth();

  const user = useSelector(selectUser);
  console.log({ user });
  return (
    <Layout seoTranslationKey="index">
      {!user.email ? (
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
            onClick={() =>
              signInWithEmailAndPassword('test@test.com', 'Tester123')
            }
            colorScheme="accent"
          >
            Sign In
          </Button>
        </>
      ) : (
        <Button onClick={() => logout()} colorScheme="success">
          Logout
        </Button>
      )}
    </Layout>
  );
}
