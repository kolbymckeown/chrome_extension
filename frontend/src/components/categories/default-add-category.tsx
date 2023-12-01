import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { FaFolderPlus } from 'react-icons/fa';
import EditableCategoryCard from './category-card-edit';
import { Category } from '@/types/category';

export const DefaultAddCategory = () => {
  const [isCreating, setIsCreating] = useState(false);

  return (
    <Box
      maxW="sm"
      h={'350px'}
      border="1px solid"
      borderColor="scheme.dusty-rose"
      borderRadius="lg"
      overflow="hidden"
      boxShadow={'10px 10px #c96a6c'}
      position={'relative'}
    >
      {isCreating ? (
        <EditableCategoryCard
          category={{} as Category}
          setIsEditing={setIsCreating}
          displayImage={''}
        />
      ) : (
        <Flex
          color={'scheme.main-green-blue'}
          bg={'scheme.light-rose'}
          position={'absolute'}
          top={'40%'}
          left={'18%'}
          cursor={'pointer'}
          pb={1}
          px={2}
          alignItems={'center'}
          onClick={() => setIsCreating(true)}
        >
          <Text
            fontSize="x-large"
            fontWeight="600"
            textShadow={'2px 2px #e5ebe7'}
            pr={2}
          >
            Add Category
          </Text>
          <Icon as={FaFolderPlus} color="scheme.main-green-blue" w={6} h={6} />
        </Flex>
      )}
    </Box>
  );
};
