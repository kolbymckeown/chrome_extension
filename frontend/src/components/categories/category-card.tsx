import React from 'react';
import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  Text,
} from '@chakra-ui/react';
import { Category } from '@/types/category';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useSelector } from 'react-redux';
import { CartItem } from '@/types/item';
import { FaShoppingCart } from 'react-icons/fa';
import ImageWithFallback from './image-fallback';
import Link from 'next/link';

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard = ({ category }: CategoryCardProps) => {
  const { title, id: categoryId, isPublic } = category;

  //  @ts-ignore
  const items = useSelector((state) => {
    console.log(state);
    return state.items.items;
  });

  const filteredImages = items
    .filter((item: CartItem) => item.categoryId === categoryId)
    .map((item: CartItem) => item.image)
    .slice(0, 4);

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      shadow="md"
      borderColor={'scheme.dusty-rose'}
      boxShadow={'none'}
      width={'300px'}
      position="relative"
    >
      <Link href={`/category/${categoryId}`} passHref>
        {/* private badge */}
        {!isPublic && (
          <Badge
            borderRadius="7px 0px 7px 0px"
            position="absolute"
            color="scheme.dusty-rose"
            backgroundColor={'scheme.light-rose'}
          >
            Private
          </Badge>
        )}
        {filteredImages.length > 0 && (
          <Box position="relative">
            {/* Icon */}
            <Icon
              as={FaShoppingCart}
              color="scheme.light-rose"
              w={6}
              h={6}
              margin={2}
              position="absolute"
              top="16px"
              right="16px"
            />
            {/* Badge */}
            {filteredImages.length > 0 && (
              <Box
                backgroundColor="scheme.dusty-rose"
                color="white"
                borderRadius="full"
                paddingX="2"
                fontSize="sm"
                position="absolute"
                top="2"
                right="1"
              >
                {filteredImages.length}
              </Box>
            )}
          </Box>
        )}
        <Flex p="4" alignItems="center" flexDirection="column">
          <Text fontSize="2xl" fontWeight="bold" color="scheme.dusty-rose">
            {title}
          </Text>
          <Grid templateColumns="repeat(2, 1fr)">
            {filteredImages.length > 3 ? (
              filteredImages.map((image: string, i: number) => (
                <Box key={i} overflow="hidden" w={'130px'} h={'130px'}>
                  <ImageWithFallback src={image} alt={`Image ${image}`} />
                </Box>
              ))
            ) : (
              <Box
                key={filteredImages[0]}
                borderWidth="1px"
                overflow="hidden"
                w={'260px'}
                h={'260px'}
              >
                <ImageWithFallback
                  src={filteredImages[0]}
                  alt={`Image ${filteredImages[0]}`}
                />
              </Box>
            )}
          </Grid>
        </Flex>
        <Flex direction={'column'} alignItems="center">
          <Divider borderColor="scheme.light-rose" width={'80%'} />
        </Flex>
        <Flex p={4} justifyContent="space-evenly">
          <Button backgroundColor="scheme.light-rose">
            <EditIcon color="scheme.dusty-rose" />
          </Button>
          <Button backgroundColor="scheme.light-rose">
            <DeleteIcon color="scheme.dusty-rose" />
          </Button>
        </Flex>
      </Link>
    </Box>
  );
};
