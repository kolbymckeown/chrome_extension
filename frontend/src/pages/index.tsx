import DisplayCase, {
  CartItemsResponse,
} from '@/components/categories/display-case';
import { CategoriesResponse } from '@/components/categories/tabs';
import { Layout } from '@/components/layout';
import useQuery from '@/hooks/use-query';
import { selectUser } from '@/redux/slices/user.slice';
import { useDispatch, useSelector } from 'react-redux';
import LandingPage from '@/components/landing-page';
import { useEffect } from 'react';
import { fetchItemsStart, fetchItemsSuccess } from '@/redux/slices/items.slice';

export default function Home() {
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
    <>
      {!user.email ? (
        <>
          <LandingPage />
        </>
      ) : (
        <>
          <Layout seoTranslationKey="index">
            <DisplayCase categories={categories} />
          </Layout>
        </>
      )}
    </>
  );
}
