import React, { useEffect } from 'react';
import { Box, Text, Grid } from '@chakra-ui/react';
import { CategoriesResponse } from './tabs';
import { Category } from '@/types/category';
import { CategoryCard } from './category-card';
import useQuery from '@/hooks/use-query';
import { CartItem } from '@/types/item';
import { useDispatch } from 'react-redux';
import { fetchItemsStart, fetchItemsSuccess } from '@/redux/slices/items.slice';

interface DisplayCaseProps {
  categories: CategoriesResponse | undefined;
}

export interface CartItemsResponse {
  cartItems: CartItem[];
  statusCode: number;
}

export default function DisplayCase({ categories }: DisplayCaseProps) {
  const dispatch = useDispatch();
  const { data: cartItems } = useQuery<CartItemsResponse>('cart-item', {
    query: { cartItemId: 'all' },
  });

  useEffect(() => {
    dispatch(fetchItemsStart());
    if (cartItems) {
      dispatch(fetchItemsSuccess(cartItems.cartItems));
    }
  }, [dispatch, cartItems]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      my={10}
    >
      <Text fontSize="3xl" mb={4}>
        Categories
      </Text>
      <Grid templateColumns="repeat(auto-fill, 300px)" gap={6} w="100%" px={6}>
        {categories?.categories?.map((category: Category) => (
          <CategoryCard category={category} key={category.id} />
        ))}
      </Grid>
    </Box>
  );
}
