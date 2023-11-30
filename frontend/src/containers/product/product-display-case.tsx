import { useState } from 'react';
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

export default function ProductDisplayCase() {
  const { categoryId } = useParams();
  const [sortOption, setSortOption] = useState('');
  const toast = useToast();
  const items = useSelector(selectItems);
  let itemsList = items.filter(
    (item: CartItem) => item.categoryId === +categoryId!
  );

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

  const selectedCategory = useSelector((state: any) =>
    state.category.categories.find(
      (category: any) => category.id === +categoryId!
    )
  );

  return (
    <Box>
      <CategoryTabs />
      <Box p={5}>
        {/* <Flex alignItems="center" justifyContent={'center'} gap={5} mb={4}>
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
        </Flex> */}

        <Select onChange={(e) => setSortOption(e.target.value)} w={'300px'}>
          <option value="dateNewest">Date Added: Newest to Oldest</option>
          <option value="dateOldest">Date Added: Oldest to Newest</option>
          <option value="priceHighToLow">Price: High to Low</option>
          <option value="priceLowToHigh">Price: Low to High</option>
        </Select>

        {itemsList.length !== 0 ? (
          <Flex wrap="wrap">
            {itemsList.map((item: CartItem) => (
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
