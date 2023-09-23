import { AddCategory } from '@/components/categories/add-category';
import { CategoryCard } from '@/components/categories/category-card';
import DisplayCase from '@/components/categories/display-case';
import CategoryTabs, { CategoriesResponse } from '@/components/categories/tabs';
import { AddItem } from '@/components/items/add-item';
import { Layout } from '@/components/layout';
import useAuth from '@/hooks/use-auth';
import useQuery from '@/hooks/use-query';
import { selectUser } from '@/redux/slices/user.slice';
import { Category } from '@/types/category';
import { Button, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';


export default function Home() {
  const {
    createAccountWithEmailAndPassword,
    signInWithEmailAndPassword,
    logout,
  } = useAuth();

  const user = useSelector(selectUser);

  const { data: categories } = useQuery<CategoriesResponse>(
    `categories`,
    {
      query: { categoryId: 'all' },
    },
    { enabled: !!user.email }
  );

  return (
    <ErrorBoundary
      fallback={
        <Text color="red.500" fontSize="xl">
          Something went wrong...
        </Text>
      }
    >
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
          <>
            <CategoryTabs />

            <Button onClick={() => logout()} colorScheme="success">
              Logout
            </Button>
            <AddItem />
            <AddCategory />
            <DisplayCase />
            {categories?.categories?.map((category: Category) => (
              <CategoryCard category={category} key={category.id} />
            ))}
          </>
        )}
      </Layout>
    </ErrorBoundary>
  );
}
