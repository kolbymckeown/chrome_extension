import { AddCategory } from '@/components/categories/add-category';
import { CategoryCard } from '@/components/categories/category-card';
import { AddItem } from '@/components/items/add-item';
import { Item } from '@/components/items/item';
import { Layout } from '@/components/layout';
import useAuth from '@/hooks/use-auth';
import useQuery from '@/hooks/use-query';
import { selectUser } from '@/redux/slices/user.slice';
import { Category } from '@/types/category';
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

  const { data: categories } = useQuery(
    `categories`,
    {
      query: { categoryId: 'all' },
    },
    { enabled: !!user.email }
  );

  console.log('categories',categories );
  
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
        <>
          <Button onClick={() => logout()} colorScheme="success">
            Logout
          </Button>
          <AddItem />
          <AddCategory />
          {categories?.categories?.map((category: Category) => (
            <CategoryCard category={category} key={category.id} />
          ))}

        </>
      )}
    </Layout>
  );
}
