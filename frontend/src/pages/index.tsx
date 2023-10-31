import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems } from '@/redux/slices/items.slice';
import { fetchCategories } from '@/redux/slices/category.slice';
import { selectUser, userLoading } from '@/redux/slices/user.slice';
import DisplayCase from '@/containers/categories/display-case';
import { Layout } from '@/components/layout';
import CategoryPage from './category';
import NotFound from './404page';
import RegisterPage from './login';
import LandingPage from '@/components/landing-page';
import { RouteObject, useRoutes } from 'react-router-dom';
import LoadingScreen from './Loading';
import { AppDispatch } from '@/redux/store';

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
              <DisplayCase />
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
