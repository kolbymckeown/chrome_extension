import React, { useState, useRef } from 'react';
import {
  Box,
  Flex,
  Input,
  List,
  ListItem,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { selectItems } from '@/redux/slices/items.slice';
import ImageWithFallback from '../helpers/image-fallback';
import { useNavigate } from 'react-router-dom';

const SearchComponent = () => {
  const [searchText, setSearchText] = useState('');
  const items = useSelector(selectItems);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const itemsMatchingSearch =
    searchText.length > 0
      ? items.filter(
          (item) =>
            item.title.toLowerCase().includes(searchText.toLowerCase()) ||
            item.description.toLowerCase().includes(searchText.toLowerCase()) ||
            (item.store &&
              item.store.toLowerCase().includes(searchText.toLowerCase()))
        )
      : [];

  return (
    <Box position="relative" mr={'5px'} display={{ base: 'none', md: 'flex' }}>
      <Input
        ref={inputRef}
        placeholder="Search items..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        sx={{
          '::placeholder': {
            color: 'scheme.dark-green-blue', // Change to desired color
          },

          color: 'scheme.dark-green-blue',
        }}
        bg={useColorModeValue('white', 'gray.800')}
        focusBorderColor="#ffc0cb"
      />
      {searchText && (
        <Box
          position="absolute"
          left="0"
          right="0"
          mt="2"
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow="md"
          borderRadius="md"
          maxH="300px"
          overflowY="auto"
          zIndex="12"
          w={'300px'}
        >
          <List spacing={2}>
            {itemsMatchingSearch.map((item) => (
              <ListItem
                key={item.id}
                p={3}
                borderRadius="md"
                backgroundColor={'white'}
                cursor={'pointer'}
                // on click go to category with product
                onClick={() => {
                  navigate(`/category/${item.categoryId}`);
                  setSearchText('');
                }}
              >
                <Flex alignItems={'center'}>
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title}
                    h="25px"
                    w="25px"
                  />
                  <Flex direction={'column'} ml={'5px'}>
                    <Text fontWeight="bold">{item.title}</Text>
                    <Text fontSize="sm">{item?.store}</Text>
                  </Flex>
                </Flex>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default SearchComponent;
