import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems } from '@/redux/slices/items.slice';
import { fetchCategories } from '@/redux/slices/category.slice';
import { selectUser, userLoading } from '@/redux/slices/user.slice';
import { Layout } from '@/components/layout';
import NotFound from './404page';
import RegisterPage from './login';
import LandingPage from '@/components/landing-page';
import { RouteObject, useRoutes } from 'react-router-dom';
import LoadingScreen from './Loading';
import { AppDispatch } from '@/redux/store';
import ProductDisplayCase from '@/containers/product/product-display-case';
import CategoryDisplayCase from '@/containers/categories/category-display-case';

export default function Home() {
  const user = useSelector(selectUser);
  const userIsLoading = useSelector(userLoading);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (user?.email) {
      dispatch(fetchCategories());
      dispatch(fetchCartItems());
    }
  }, [dispatch, user?.email]);

  const InnerRouter = () => {
    const routes: RouteObject[] = [
      {
        path: '/',
        element: <Layout seoTranslationKey="try" />,
        children: [
          {
            index: true,
            element: user?.email ? (
              <CategoryDisplayCase />
            ) : userIsLoading ? (
              <LoadingScreen />
            ) : (
              <LandingPage />
            ),
          },
          {
            path: `category/:categoryId`,
            element: user?.email ? (
              <ProductDisplayCase />
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
