import React from 'react';
import {
  Box,
  Button,
  Grid,
  Text,
  Image,
  useBreakpointValue,
  Flex,
} from '@chakra-ui/react';
import Link from 'next/link';
import useQuery from '@/hooks/use-query';

interface CartItem {
  categoryId: number;
  dateAdded: string;
  description: string;
  id: number;
  image: string;
  price: number;
  purchased: boolean;
  quantity: number;
  store: string | null;
  title: string;
  url: string | null;
}

interface CartItemsResponse {
  cartItems: CartItem[];
  statusCode: number;
}

export default function DisplayCase() {
  const { data: cartItems } = useQuery<CartItemsResponse>('cart-item', {
    query: { cartItemId: 'all' },
  });

  const gridTemplateColumns = useBreakpointValue({
    base: '1fr',
    md: 'repeat(2, 1fr)',
  });

  const groupedItems: { [key: number]: CartItem[] } = {};

  if (cartItems?.cartItems) {
    cartItems.cartItems.forEach((item) => {
      if (!groupedItems[item.categoryId]) {
        groupedItems[item.categoryId] = [];
      }
      groupedItems[item.categoryId].push(item);
    });
  }

  return (
    <Box>
      <Text fontSize="3xl" mb={4}>
        Display Case
      </Text>
      <Flex gap={5} mx="auto" direction={['column', 'column', 'row', 'row']}>
        {Object.keys(groupedItems).map((categoryId) => (
          <Box
            key={categoryId}
            bg="background.light"
            p={4}
            rounded="md"
            mb={4}
            width={['100%', '100%', '100%', '600px']}
          >
            <Text fontSize="2xl" mb={2}>
              Category {categoryId}
            </Text>
            <Link href={`/category/${categoryId}`} passHref>
              <Button colorScheme="primary" mb={4}>
                View Category
              </Button>
            </Link>
            <Grid templateColumns={gridTemplateColumns} gap={4}>
              {groupedItems[parseInt(categoryId)].slice(0, 4).map((item) => (
                <Box key={item.id}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    boxSize="100px"
                    objectFit="cover"
                  />
                  <Text fontWeight="bold">{item.title}</Text>
                  <Text>Price: ${item.price}</Text>
                  <Text>Quantity: {item.quantity}</Text>
                  <Link href={`/cart/${item.id}`} passHref>
                    <Button colorScheme="primary" variant="outline" mt={2}>
                      View Item
                    </Button>
                  </Link>
                </Box>
              ))}
            </Grid>
          </Box>
        ))}
      </Flex>
    </Box>
  );
}
