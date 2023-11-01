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
  // type the following function

  function getFirst4ImagesByCategoryId(
    itemsList: CartItem[],
    categoryId: number
  ) {
    const filteredItems = itemsList.filter(
      (item: CartItem) => item.categoryId === categoryId
    );

    const first4Items = filteredItems.slice(0, 4);

    const images = first4Items.map((item: CartItem) => item.image);

    return images;
  }

  const filteredImages = getFirst4ImagesByCategoryId(items, +categoryId);
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
