import DisplayCase, {
  CartItemsResponse,
} from '@/containers/categories/display-case';
import { CategoriesResponse } from '@/components/categories/tabs';
import { Layout } from '@/components/layout';
import useQuery from '@/hooks/use-query';
import { selectUser } from '@/redux/slices/user.slice';
import { useDispatch, useSelector } from 'react-redux';
import LandingPage from '@/components/landing-page';
import { useEffect } from 'react';
import { fetchItemsStart, fetchItemsSuccess } from '@/redux/slices/items.slice';
import {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
} from '@/redux/slices/category.slice';

export default function Home() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const { data: cartItems } = useQuery<CartItemsResponse>('cart-item', {
    query: { cartItemId: 'all' },
  });

  const { data: categories } = useQuery<CategoriesResponse>(`categories`, {
    query: { categoryId: 'all' },
  });

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsStart());
      dispatch(fetchCategoriesStart());
      if (cartItems) {
        dispatch(fetchItemsSuccess(cartItems.cartItems));
      }
      if (categories) {
        dispatch(fetchCategoriesSuccess(categories.categories));
      }
    }
  }, [dispatch, cartItems]);

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
