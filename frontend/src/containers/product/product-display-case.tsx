import { CartItem } from '@/types/item';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';

import { useSelector } from 'react-redux';
import { ProductCard } from './product-card';
import { useParams } from 'react-router-dom';
import { selectItems } from '@/redux/slices/items.slice';
import { CategoryTabs } from '@/components/tabs/tabs';

export default function ProductDisplayCase() {
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
    <Box>
      <CategoryTabs />
      <Box p={5}>
        <Text
          fontSize="4xl"
          textAlign={'center'}
          fontWeight={'700'}
          color={'scheme.main-green-blue'}
          textShadow={'2px 2px #ead2ce'}
        >
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
    </Box>
  );
}
