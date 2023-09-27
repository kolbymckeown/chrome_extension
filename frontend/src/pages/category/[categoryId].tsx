import { CartItemsResponse } from '@/components/categories/display-case';
import { Layout } from '@/components/layout';
import useQuery from '@/hooks/use-query';
import { Box, Button, Flex, Image, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ErrorBoundary } from 'react-error-boundary';

export default function CategoryPage() {
  const router = useRouter();
  const { categoryId } = router.query;

  //   const { data: cartItems } = useQuery<CartItemsResponse>('cart-item', {
  //     query: { cartItemId: 'all', categoryId },
  //   });

  return (
    <ErrorBoundary fallback={<Text>Something went wrong...</Text>}>
      <Layout seoTranslationKey={`${categoryId}`}>
        <Box p={5}>
          <Text fontSize="xl" mb={5}>
            Category Page: {categoryId}
          </Text>

          <Flex wrap="wrap" justify="space-between">
            {cartItems?.cartItems.map((item) => (
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
    </ErrorBoundary>
  );
}
