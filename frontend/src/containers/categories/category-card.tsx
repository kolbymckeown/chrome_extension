import { selectItems } from '@/redux/slices/items.slice';
import { Category } from '@/types/category';
import { CartItem } from '@/types/item';
import { Box, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import EditableCategoryCard from '../../components/categories/category-card-edit';
import DisplayCategoryCard from '../../components/categories/category-card-display';
interface CategoryCardProps {
  category: Category;
}
const CategoryCard = ({ category }: CategoryCardProps) => {
  const { title, id: categoryId, isPublic } = category;
  const [isEditing, setIsEditing] = useState(false);

  const items = useSelector(selectItems);

  const filteredImages =
    categoryId !== undefined && items?.[+categoryId]
      ? items[+categoryId].map((item: CartItem) => item.image).slice(0, 4)
      : [];

  return (
    <Box
      maxW="sm"
      border="1px solid"
      borderColor="scheme.dusty-rose"
      borderRadius="lg"
      overflow="hidden"
      shadow="none"
    >
      {!isEditing ? (
        <DisplayCategoryCard
          title={title}
          filteredImages={filteredImages}
          categoryId={categoryId}
          isPublic={isPublic}
          setIsEditing={setIsEditing}
        />
      ) : (
        <EditableCategoryCard
          category={category}
          setIsEditing={setIsEditing}
          filteredImages={filteredImages}
        />
      )}
    </Box>
  );
};

export default CategoryCard;
