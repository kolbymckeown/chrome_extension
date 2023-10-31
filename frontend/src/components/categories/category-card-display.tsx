import React from 'react';
import {
  Text,
  Box,
  Tooltip,
  Icon,
  Divider,
  Badge,
  Flex,
  useToast,
  IconButton,
} from '@chakra-ui/react';
import { FaShoppingCart } from 'react-icons/fa';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import ConfirmationModal from '../helpers/confirmation-modal';
import { Link } from 'react-router-dom';
import { useMutation } from '@/hooks/use-query';
import CategoryDisplayImages from './category-display-images';
import { useDispatch } from 'react-redux';
import { deleteReduxCategory } from '@/redux/slices/category.slice';

interface DisplayCategoryCardProps {
  title: string;
  isPublic: boolean;
  filteredImages: string[];
  categoryId: number | undefined;
  setIsEditing: (value: boolean) => void;
}

const DisplayCategoryCard = ({
  title,
  isPublic,
  filteredImages,
  categoryId,
  setIsEditing,
}: DisplayCategoryCardProps) => {
  const [isModalOpen, setModalIsOpen] = React.useState(false);
  const toast = useToast();
  const dispatch = useDispatch();
  const { mutate: deleteCategory } = useMutation(`categories`, {
    type: 'DELETE',
    query: { categoryId },
  });

  const handleDelete = () => {
    deleteCategory({
      onSuccess: () => {
        toast({
          title: 'Item deleted.',
          description: 'Your item has been successfully deleted.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      },
      onError: () => {
        toast({
          title: 'Error',
          description: 'Something went wrong.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      },
    });
    dispatch(deleteReduxCategory(categoryId));
  };

  return (
    <Box
      maxW="sm"
      overflow="hidden"
      boxShadow={'none'}
      width={'300px'}
      position="relative"
    >
      <Link to={`/category/${categoryId}`}>
        {/* private badge */}
        {!isPublic && (
          <Badge
            borderRadius="7px 0px 7px 0px"
            position="absolute"
            color="scheme.dusty-rose"
            backgroundColor={'scheme.light-rose'}
          >
            Private
          </Badge>
        )}
        <Flex p="4" alignItems="center" flexDirection="column">
          <Text
            fontSize="2xl"
            fontWeight="bold"
            color="scheme.dusty-rose"
            lineHeight="1.25"
            maxHeight="2.5em"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="normal"
            display="-webkit-box"
            style={{
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {title}
          </Text>
          <CategoryDisplayImages filteredImages={filteredImages} />
        </Flex>
        <Flex direction={'column'} alignItems="center">
          <Divider borderColor="scheme.light-rose" width={'80%'} />
        </Flex>
      </Link>

      <Flex p={4} justifyContent="space-evenly">
        <>
          <Tooltip label="Edit" aria-label="Edit">
            <IconButton
              bg={'scheme.light-rose'}
              aria-label="Purchased"
              color={'scheme.dusty-rose'}
              icon={<EditIcon color="scheme.dusty-rose" />}
              borderRadius={'full'}
              onClick={() => setIsEditing(true)}
            />
          </Tooltip>
          <Flex>
            <Link to={`/category/${categoryId}`}>
              {/* Icon */}
              <Icon
                as={FaShoppingCart}
                color="scheme.light-rose"
                w={6}
                h={6}
                margin={2}
              />
            </Link>
            {/* Badge */}
            {filteredImages.length > 0 && (
              <Tooltip label="Cart Items" aria-label="cart-items">
                <Box
                  backgroundColor="scheme.dusty-rose"
                  color="white"
                  borderRadius="full"
                  paddingX="2"
                  fontSize="sm"
                  position="absolute"
                  right="120px"
                >
                  {filteredImages.length}
                </Box>
              </Tooltip>
            )}
          </Flex>
          <Tooltip label="Delete" aria-label="Delete">
            <IconButton
              bg={'scheme.light-rose'}
              aria-label="Purchased"
              color={'scheme.dusty-rose'}
              icon={<DeleteIcon color="scheme.dusty-rose" />}
              borderRadius={'full'}
              onClick={() => setModalIsOpen(true)}
            />
          </Tooltip>
          <ConfirmationModal
            isOpen={isModalOpen}
            onClose={() => setModalIsOpen(false)}
            title={'Delete Category'}
            callback={handleDelete}
          />
        </>
      </Flex>
    </Box>
  );
};

export default DisplayCategoryCard;
