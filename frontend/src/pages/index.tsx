import DisplayCase, {
  CartItemsResponse,
} from '@/components/categories/display-case';
import { CategoriesResponse } from '@/components/categories/tabs';
import { Layout } from '@/components/layout';
import useAuth from '@/hooks/use-auth';
import useQuery from '@/hooks/use-query';
import { selectUser } from '@/redux/slices/user.slice';
import { Button } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchItemsStart, fetchItemsSuccess } from '@/redux/slices/items.slice';

export default function Home() {
  const { createAccountWithEmailAndPassword, signInWithEmailAndPassword } =
    useAuth();

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const { data: cartItems } = useQuery<CartItemsResponse>('cart-item', {
    query: { cartItemId: 'all' },
  });

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsStart());
      if (cartItems) {
        dispatch(fetchItemsSuccess(cartItems.cartItems));
      }
    }
  }, [dispatch, cartItems]);

  const { data: categories } = useQuery<CategoriesResponse>(
    `categories`,
    {
      query: { categoryId: 'all' },
    },
    { enabled: !!user.email }
  );

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
        <DisplayCase categories={categories} />
      )}
    </Layout>
  );
}
