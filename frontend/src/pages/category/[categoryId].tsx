import { Layout } from '@/components/layout';
import { CartItem } from '@/types/item';
import { Box, Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ErrorBoundary } from 'react-error-boundary';
import { useSelector } from 'react-redux';
import { ProductCard } from './product-card';

export default function CategoryPage() {
  const router = useRouter();
  const { categoryId } = router.query;

  //  @ts-ignore
  const itemsList = useSelector((state) => state.items.items);

  return (
    <ErrorBoundary fallback={<Text>Something went wrong...</Text>}>
      <Layout seoTranslationKey={`${categoryId}`}>
        <Box p={5}>
          <Text fontSize="xl" mb={5}>
            Category Page: {categoryId}
          </Text>

          <Flex wrap="wrap" justify="space-between">
            {categoryId &&
              itemsList[+categoryId]?.map((item: CartItem) => (
                <ProductCard item={item} key={item.id} />
              ))}
          </Flex>
        </Box>
      </Layout>
    </ErrorBoundary>
  );
}
