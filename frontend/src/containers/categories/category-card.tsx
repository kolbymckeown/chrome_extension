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

  function getFirstImageByCategoryId(
    itemsList: CartItem[],
    categoryId: number
  ) {
    const filteredItems = itemsList.filter(
      (item: CartItem) => item.categoryId === categoryId
    );

    for (let i = 0; i < filteredItems.length; i++) {
      if (filteredItems[i]?.image) {
        return filteredItems[i].image;
      }
    }
    return '';
  }

  const displayImage = getFirstImageByCategoryId(items, +categoryId);
  return (
    <Box
      maxW="sm"
      border="1px solid"
      borderColor="scheme.dusty-rose"
      borderRadius="lg"
      overflow="hidden"
      boxShadow={'10px 10px #c96a6c'}
    >
      {!isEditing ? (
        <DisplayCategoryCard
          title={title}
          displayImage={displayImage}
          categoryId={categoryId}
          isPublic={isPublic}
          setIsEditing={setIsEditing}
        />
      ) : (
        <EditableCategoryCard
          category={category}
          setIsEditing={setIsEditing}
          displayImage={displayImage}
        />
      )}
    </Box>
  );
};

export default CategoryCard;
