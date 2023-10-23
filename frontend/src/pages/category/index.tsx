import { CartItemsResponse } from '@/containers/categories/display-case';
import CategoryTabs from '@/components/categories/tabs';
import { Layout } from '@/components/layout';
import useQuery from '@/hooks/use-query';
import { selectActiveTabs } from '@/redux/slices/category.slice';
import { Box, Button, Flex, Image, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { useSelector } from 'react-redux';

export default function AllCategoriesPage() {
  const { data: cartItems } = useQuery<CartItemsResponse>('cart-item', {
    query: { cartItemId: 'all' },
  });

  const activeTabs = useSelector(selectActiveTabs);

  const filteredCartItems = !!activeTabs.length
    ? cartItems?.cartItems.filter((item) =>
        activeTabs.includes(item.categoryId)
      )
    : cartItems?.cartItems;

  return (
    <Layout seoTranslationKey={`allCategories`}>
      <Box p={5}>
        <CategoryTabs />
        <Text fontSize="xl" mb={5}>
          All Categories
        </Text>

        <Flex wrap="wrap" justify="space-between">
          {filteredCartItems &&
            filteredCartItems.map((item) => (
              <VStack
                key={item.id}
                w="250px"
                h="350px"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                mb={5}
                align="start"
                p={3}
              >
                <Image
                  boxSize="150px"
                  objectFit="cover"
                  src={item.image}
                  alt={item.title}
                />
                <Text fontWeight="bold" fontSize="md">
                  {item.title}
                </Text>
                <Text fontSize="sm">{item.description}</Text>
                <Text fontSize="sm">Quantity: {item.quantity}</Text>

                <VStack mt="auto">
                  <Text color="success.600">${item.price.toFixed(2)}</Text>
                  {item.url && (
                    <Link href={`${item.url}`} passHref>
                      <Button colorScheme="primary" variant="outline" mt={2}>
                        View Product
                      </Button>
                    </Link>
                  )}
                </VStack>
              </VStack>
            ))}
        </Flex>
      </Box>
    </Layout>
  );
}
