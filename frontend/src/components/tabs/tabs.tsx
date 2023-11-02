import { selectCategories } from '@/redux/slices/category.slice';
import { Flex } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CategoryTab } from './tab';

export const CategoryTabs = () => {
  const categories = useSelector(selectCategories);
  const { categoryId = '' } = useParams();

  return (
    <Flex w="100%" bg={'scheme.light-rose'} overflow={'scroll'}>
      {categories?.map((category: any) => (
        <CategoryTab
          category={category}
          selected={category.id === +categoryId}
        />
      ))}
    </Flex>
  );
};
