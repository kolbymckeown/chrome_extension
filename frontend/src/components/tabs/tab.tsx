import { Category } from '@/types/category';
import { Box, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

interface CategoryTabProps {
  category: Category;
  selected: boolean;
}
export const CategoryTab = ({ category, selected }: CategoryTabProps) => {
  const { title } = category;
  const navigate = useNavigate();
  return (
    <Box
      width={'130px'}
      px={'10px'}
      mr={'8px'}
      cursor={'pointer'}
      bg={!selected ? 'scheme.light-rose' : 'scheme.dusty-rose'}
      color={!selected ? 'scheme.dusty-rose' : 'scheme.light-rose'}
      textShadow={`2px 2px ${!selected ? '#e5ebe7' : '#4c8d99'}`}
      // borderBottom={`2px solid #c96a6c`}
      _hover={{
        backgroundColor: 'scheme.dusty-rose',
        color: 'scheme.light-rose',
        textShadow: '2px 2px #4c8d99',
        boxShadow: '8px 0px #4c8d99',
      }}
      // boxShadow={`4px 4px ${!selected ? '#c96a6c' : ' #c96a6c'}`}
      onClick={() => navigate('/category/' + category.id)}
      borderRadius={'0px 0px 5px 5px'}
      boxShadow={selected ? '8px 0px #4c8d99' : ''}
    >
      <Text
        fontSize={'x-large'}
        fontWeight={'600'}
        textOverflow={'ellipsis'}
        overflow={'hidden'}
        whiteSpace={'nowrap'}
      >
        {title}
      </Text>
    </Box>
  );
};
