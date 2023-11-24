import useQuery from '@/hooks/use-query';
import { CartItem } from '@/types/item';
import { Button, Flex, Spinner, Text } from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';
import { ProductCard } from './product-card';

type QueryResponse = {
  cartItems: CartItem[];
  message?: string;
};

export default function PublicItemsPage() {
  const { categoryId } = useParams();

  const { data, isLoading } = useQuery<QueryResponse>('/public-category', {
    query: {
      categoryId,
    },
  });

  if (isLoading) {
    return (
      <Flex
        position={'absolute'}
        top={'40%'}
        left="50%"
        transform={'translate(-50%)'}
      >
        <Spinner size={'lg'} color="scheme.main-green-blue" thickness="3px" />
      </Flex>
    );
  }

  if (data?.message)
    return (
      <Flex pt={10} mx="auto" flexDir="column" alignItems="center" gap={5}>
        <Text as={'h1'} color="scheme.dusty-rose" fontSize="2xl">
          {data.message}
        </Text>
        <Link to="/">
          <Button
            color="scheme.dusty-rose"
            borderColor="scheme.dusty-rose"
            borderWidth={1}
            bg="white"
            _hover={{
              bg: 'scheme.dusty-rose',
              color: 'white',
              border: '1px solid white',
            }}
            boxShadow="3px 3px pink"
          >
            Home
          </Button>
        </Link>
      </Flex>
    );

  return (
    <div>
      <Flex wrap="wrap">
        {data?.cartItems.map((item: CartItem) => (
          <ProductCard key={item.id} item={item} publicView />
        ))}
      </Flex>
    </div>
  );
}
