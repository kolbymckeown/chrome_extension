import React from 'react';
import { Box, Text, Image, Flex } from '@chakra-ui/react';
import { Category } from '@/types/category';
import useQuery from '@/hooks/use-query';

interface CategoryCardProps {
    category: Category
}

export const CategoryCard = ({category}: CategoryCardProps) => {
    const {title, id: categoryId, isPublic} = category
    console.log(categoryId)
    
    const { data: cartItems } = useQuery(`cart-item`, {
        query: { cartItemId: "all", categoryId },
    });

    console.log(cartItems)

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


