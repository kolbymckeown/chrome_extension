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
      bg={!selected ? 'scheme.dusty-rose' : 'white'}
      color={!selected ? 'white' : 'scheme.dusty-rose'}
      _hover={{
        backgroundColor: 'white',
        color: 'scheme.dusty-rose',
        border: '1px solid',
        borderColor: 'pink',
        borderBottom: 'none',
      }}
      onClick={() => navigate('/category/' + category.id)}
      borderRadius={'5px 5px 0px 0px'}
      boxShadow={selected ? '4px 0px pink' : ''}
      border={selected ? '1px solid' : 'none'}
      borderColor={'pink'}
      borderBottom={'none'}
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
