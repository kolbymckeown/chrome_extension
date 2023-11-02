import React from 'react';
import { Box, Text, Grid } from '@chakra-ui/react';
import { Category } from '@/types/category';
import CategoryCard from './category-card';
import { CartItem } from '@/types/item';
import { useSelector } from 'react-redux';
import { selectCategories } from '@/redux/slices/category.slice';
export interface CartItemsResponse {
  cartItems: CartItem[];
  statusCode: number;
}

export default function CategoryDisplayCase() {
  const categories = useSelector(selectCategories);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      my={10}
    >
      <Text
        fontSize="3xl"
        mb={4}
        fontWeight={700}
        color="scheme.dusty-rose"
        textShadow={'2px 2px #ead2ce'}
      >
        Categories
      </Text>
      <Grid
        templateColumns="repeat(auto-fill, 300px)"
        gap={6}
        w="100%"
        px={6}
        justifyContent="center"
      >
        {categories?.map((category: Category) => (
          <CategoryCard category={category} key={category.id} />
        ))}
      </Grid>
    </Box>
  );
}
