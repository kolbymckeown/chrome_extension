import { CartItem } from '@/types/item';
import { Box, Flex, Text } from '@chakra-ui/react';

import { useSelector } from 'react-redux';
import { ProductCard } from '../../containers/product/product-card';
import { useParams } from 'react-router-dom';

export default function CategoryPage() {
  const { categoryId } = useParams();

  let itemsList = useSelector(
    (state: any) => state.items.items?.[+categoryId!]
  );

  const selectedCategory = useSelector((state: any) =>
    state.category.categories.find(
      (category: any) => category.id === +categoryId!
    )
  );
  return (
    <Box p={5}>
      <Text fontSize="xl" mb={5}>
        {selectedCategory?.title}
      </Text>

      <Flex wrap="wrap">
        {categoryId &&
          itemsList?.map((item: CartItem) => (
            <ProductCard item={item} key={item.id} />
          ))}
      </Flex>
    </Box>
  );
}
