import React from 'react';
import { Box, Button } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTab, selectActiveTabs } from '@/redux/slices/category.slice';
import { selectUser } from '@/redux/slices/user.slice';
import useQuery from '@/hooks/use-query';

export interface Category {
  createdAt: string;
  isPublic: boolean;
  title: string;
  id: number;
}

export interface CategoriesResponse {
  categories: Category[];
  statusCode: number;
}

export default function CategoryTabs() {
  const user = useSelector(selectUser);
  const activeTabs = useSelector(selectActiveTabs);
  const dispatch = useDispatch();

  const { data } = useQuery<CategoriesResponse>(
    'categories',
    {
      query: { categoryId: 'all' },
    },
    { enabled: !!user.email }
  );

  const categories = data?.categories || [];

  const onClickTab = (tab: string) => {
    dispatch(toggleTab(tab));
  };

  return (
    <Box display="flex" flexWrap="wrap" justifyContent="center">
      {categories.map((category, index) => (
        <Button
          variant="unstyled"
          key={index}
          onClick={() => onClickTab(category.title)}
          bg={activeTabs.includes(category.title) ? 'primary.500' : 'gray.200'}
          color={activeTabs.includes(category.title) ? 'white' : 'black'}
          borderColor={'primary.500'}
          borderWidth={1}
          mx={2}
          my={1}
          px={4}
          py={2}
          borderRadius="full"
        >
          {category.title}
        </Button>
      ))}
    </Box>
  );
}
