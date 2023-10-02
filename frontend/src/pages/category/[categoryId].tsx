import { Layout } from '@/components/layout';
import { CartItem } from '@/types/item';
import { Box, Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { ProductCard } from './product-card';
import { CartItemsResponse } from '@/components/categories/display-case';
import useQuery from '@/hooks/use-query';
import { useEffect } from 'react';
import { selectUser } from '@/redux/slices/user.slice';
import { fetchItemsStart, fetchItemsSuccess } from '@/redux/slices/items.slice';

export default function CategoryPage() {
  const router = useRouter();
  const { categoryId } = router.query;
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  const { data: cartItems } = useQuery<CartItemsResponse>('cart-item', {
    query: { cartItemId: 'all' },
  });

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsStart());
      if (cartItems) {
        dispatch(fetchItemsSuccess(cartItems.cartItems));
      }
    }
  }, [dispatch, cartItems]);

  //  @ts-ignore
  let itemsList = useSelector((state) => state.items.items[+categoryId]);

  return (
    <Layout seoTranslationKey={`${categoryId}`}>
      <Box p={5}>
        <Text fontSize="xl" mb={5}>
          Category Page: {categoryId}
        </Text>

        <Flex wrap="wrap" justify="space-between">
          {categoryId &&
            itemsList?.map((item: CartItem) => (
              <ProductCard item={item} key={item.id} />
            ))}
        </Flex>
      </Box>
    </Layout>
  );
}
