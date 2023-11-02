import { selectCategories } from '@/redux/slices/category.slice';
import { Flex } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export const CategoryTabs = () => {
  const categories = useSelector(selectCategories);
  const selectedCategory = useParams();
  console.log(selectedCategory);

  return (
    <Flex w={'100%'} bg={'scheme.dusty-rose'}>
      hi hapsihdnp
    </Flex>
  );
};
