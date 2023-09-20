import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Category } from '@/types/category';

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard = ({ category }: CategoryCardProps) => {
  const { title, id: categoryId, isPublic } = category;

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      shadow="md"
    >
      <Box p="4">
        <Text fontSize="2xl" fontWeight="bold">
          {title}
        </Text>
      </Box>
    </Box>
  );
};
