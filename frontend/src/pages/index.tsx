import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemsStart, fetchItemsSuccess } from '@/redux/slices/items.slice';
import {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
} from '@/redux/slices/category.slice';
import { selectUser, userLoading } from '@/redux/slices/user.slice';
import DisplayCase, {
  CartItemsResponse,
} from '@/containers/categories/display-case';
import { CategoriesResponse } from '@/components/categories/tabs';
import { Layout } from '@/components/layout';
import useQuery from '@/hooks/use-query';
import CategoryPage from './category/[categoryId]';
import NotFound from './404page';
import RegisterPage from './session/login';
import LandingPage from '@/components/landing-page';
import { RouteObject, useRoutes } from 'react-router-dom';
import LoadingScreen from './Loading';

export default function Home() {
  const user = useSelector(selectUser);
  const userIsLoading = useSelector(userLoading);
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
  }, [dispatch, cartItems, user]);

  const InnerRouter = () => {
    const routes: RouteObject[] = [
      {
        path: '/',
        element: <Layout seoTranslationKey="try" />,
        children: [
          {
            index: true,
            element: user?.email ? (
              <DisplayCase categories={categories} />
            ) : userIsLoading ? (
              <LoadingScreen />
            ) : (
              <LandingPage />
            ),
          },
          {
            path: `category/:categoryId`,
            element: user?.email ? (
              <CategoryPage />
            ) : userIsLoading ? (
              <LoadingScreen />
            ) : (
              <RegisterPage />
            ),
          },
          {
            path: 'session/login',
            element: <RegisterPage />,
          },
          {
            path: '*',
            element: <NotFound />,
          },
        ],
      },
    ];
    const element = useRoutes(routes);
    return (
      <div>
        <Suspense fallback={<LoadingScreen />}>{element}</Suspense>
      </div>
    );
  };

  return <InnerRouter />;
}
