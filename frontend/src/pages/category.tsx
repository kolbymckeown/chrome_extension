import { CartItem } from '@/types/item';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';

import { useSelector } from 'react-redux';
import { ProductCard } from '../containers/product/product-card';
import { useParams } from 'react-router-dom';
import { selectItems } from '@/redux/slices/items.slice';

export default function CategoryPage() {
  const { categoryId } = useParams();

  const items = useSelector(selectItems);
  const itemsList = items.filter(
    (item: CartItem) => item.categoryId === +categoryId!
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

      {itemsList.length !== 0 ? (
        <Flex wrap="wrap">
          {categoryId &&
            itemsList?.map((item: CartItem) => (
              <ProductCard item={item} key={item.id} />
            ))}
        </Flex>
      ) : (
        <Heading>No items in this category</Heading>
      )}
    </Box>
  );
}
