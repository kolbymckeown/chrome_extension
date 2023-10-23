import { Layout } from '@/components/layout';
import { CartItem } from '@/types/item';
import { Box, Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { ProductCard } from '../../containers/product/product-card';
import { CartItemsResponse } from '@/containers/categories/display-case';
import useQuery from '@/hooks/use-query';
import { useEffect } from 'react';
import { selectUser } from '@/redux/slices/user.slice';
import { fetchItemsStart, fetchItemsSuccess } from '@/redux/slices/items.slice';
import {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  selectCategories,
} from '@/redux/slices/category.slice';
import { CategoriesResponse } from '@/components/categories/tabs';

export default function CategoryPage() {
  const router = useRouter();

  const user = useSelector(selectUser);
  const categoryId = router.query.categoryId as string | undefined;
  const dispatch = useDispatch();

  const { data: cartItems } = useQuery<CartItemsResponse>('cart-item', {
    query: { cartItemId: 'all', categoryId },
  });

  const { data: categories } = useQuery<CategoriesResponse>(`categories`, {
    query: { categoryId: 'all' },
  });

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsStart());
      dispatch(fetchCategoriesStart());
      if (cartItems) {
        dispatch(fetchItemsSuccess(cartItems.cartItems));
      }
      if (categories) {
        dispatch(fetchCategoriesSuccess(categories.categories));
      }
    }
  }, [dispatch, cartItems, user]);

  let itemsList = useSelector((state: any) => state.items.items[+categoryId!]);

  const selectedCategory = useSelector((state: any) =>
    state.category.categories.find(
      (category: any) => category.id === +categoryId!
    )
  );

  return (
    <Layout seoTranslationKey={`${categoryId}`}>
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
    </Layout>
  );
}
