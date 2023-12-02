import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Box,
  Flex,
  Heading,
  Text,
  Select,
  Button,
  useToast,
} from '@chakra-ui/react';
import { CartItem } from '@/types/item';
import { selectItems } from '@/redux/slices/items.slice';
import { ProductCard } from './product-card';
import { CategoryTabs } from '@/components/tabs/tabs';
import { FaRegCopy } from 'react-icons/fa';
import copy from 'copy-to-clipboard';
import useQuery from '@/hooks/use-query';
import { range } from '@/utils/functions';

type CartItemType = {
  cartItems: CartItem[];
  totalPages: number;
};

export default function ProductDisplayCase() {
  const { categoryId } = useParams();
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [sortOption, setSortOption] = useState('');
  const toast = useToast();
  const selectedCategory = useSelector((state: any) =>
    state.category.categories.find(
      (category: any) => category.id === +categoryId!
    )
  );
  const { data, isLoading, isError, refetch } = useQuery<CartItemType>(
    `cart-item`,
    {
      query: {
        cartItemId: 'all',
        categoryId,
        itemsPerPage,
        page,
      },
    }
  );

  useEffect(() => {
    refetch();
  }, [itemsPerPage, page, refetch]);

  console.log({ data, isLoading, isError });

  if (isLoading) return <div>Loading...</div>;
  if (data?.cartItems.length === 0)
    return <Heading>No items in this category</Heading>;

  let itemsList = data?.cartItems || [];

  const sortItems = (option: string) => {
    switch (option) {
      case 'priceHighToLow':
        return itemsList.sort((a, b) => b.price - a.price);
      case 'priceLowToHigh':
        return itemsList.sort((a, b) => a.price - b.price);
      case 'dateNewest':
        return itemsList.sort(
          (a, b) =>
            new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
        );
      case 'dateOldest':
        return itemsList.sort(
          (a, b) =>
            new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime()
        );
      default:
        return itemsList;
    }
  };

  itemsList = sortItems(sortOption);

  return (
    <Box>
      <CategoryTabs />
      <Box p={5}>
        <Flex alignItems="center" justifyContent={'center'} gap={5} mb={4}>
          <Text
            fontSize="4xl"
            textAlign={'center'}
            fontWeight={'700'}
            color={'scheme.main-green-blue'}
            textShadow={'2px 2px #ead2ce'}
          >
            {selectedCategory?.title}
          </Text>
          {selectedCategory?.isPublic && (
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
              display="flex"
              gap={2}
              onClick={() => {
                copy(`
                ${window.location.origin}/public/${categoryId}
                `);
                toast({
                  title: 'Copied to clipboard',
                  status: 'success',
                  duration: 3000,
                  isClosable: true,
                });
              }}
            >
              Share <FaRegCopy />
            </Button>
          )}
        </Flex>
        <Flex
          gap={5}
          justifyContent="space-between"
          flexDirection={{ base: 'column', md: 'row' }}
        >
          <Select onChange={(e) => setSortOption(e.target.value)} w={'300px'}>
            <option value="dateNewest">Date Added: Newest to Oldest</option>
            <option value="dateOldest">Date Added: Oldest to Newest</option>
            <option value="priceHighToLow">Price: High to Low</option>
            <option value="priceLowToHigh">Price: Low to High</option>
          </Select>

          <Select
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            defaultValue={itemsPerPage}
            w={'300px'}
          >
            {[2, 5, 10, 15].map((num) => (
              <option key={num} value={num}>
                Items per page: {num}
              </option>
            ))}
          </Select>
        </Flex>

        {itemsList.length !== 0 ? (
          <Box>
            <Flex wrap="wrap">
              {itemsList.map((item: CartItem) => (
                <ProductCard item={item} key={item.id} />
              ))}
            </Flex>
            <Flex justifyContent="center" mt={4}>
              {range(1, data?.totalPages || 0).map((pageNum) => (
                <Button
                  key={pageNum}
                  onClick={() => setPage(pageNum - 1)}
                  m={1}
                  isDisabled={page === pageNum - 1}
                >
                  {pageNum}
                </Button>
              ))}
            </Flex>
          </Box>
        ) : (
          <Heading>No items in this category</Heading>
        )}
      </Box>
    </Box>
  );
}
