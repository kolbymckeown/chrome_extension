import React from 'react';
import {
  Text,
  Box,
  Tooltip,
  Divider,
  Badge,
  Flex,
  useToast,
  IconButton,
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, HamburgerIcon } from '@chakra-ui/icons';
import ConfirmationModal from '../helpers/confirmation-modal';
import { Link } from 'react-router-dom';
import { useMutation } from '@/hooks/use-query';
import CategoryDisplayImages from './category-display-images';
import { useDispatch } from 'react-redux';
import { deleteReduxCategory } from '@/redux/slices/category.slice';

interface DisplayCategoryCardProps {
  title: string;
  isPublic: boolean;
  displayImage: string;
  categoryId: number | undefined;
  setIsEditing: (value: boolean) => void;
}

const DisplayCategoryCard = ({
  title,
  isPublic,
  displayImage,
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
      <Accordion
        position={'absolute'}
        top={0}
        left={0}
        border={'transparent'}
        allowToggle
        zIndex={10}
      >
        <AccordionItem>
          <h2>
            <AccordionButton
              _hover={{
                backgroundColor: 'transparent',
              }}
            >
              <HamburgerIcon color={'scheme.main-green-blue'} />
            </AccordionButton>
          </h2>
          <AccordionPanel p={0}>
            <Flex direction={'column'}>
              <>
                <Tooltip label="Edit" aria-label="Edit">
                  <IconButton
                    bg={'transparent'}
                    aria-label="Purchased"
                    color={'scheme.dusty-rose'}
                    icon={<EditIcon color="scheme.dusty-rose" />}
                    borderRadius={'full'}
                    onClick={() => setIsEditing(true)}
                  />
                </Tooltip>

                <Tooltip label="Delete" aria-label="Delete">
                  <IconButton
                    bg={'transparent'}
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
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
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
        <Flex alignItems="center" flexDirection="column">
          <CategoryDisplayImages displayImage={displayImage} />
          <Text
            fontSize="2xl"
            fontWeight="bold"
            color="#4c8d99"
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
            pb={1}
            position={'absolute'}
            top={'40%'}
            textShadow={'2px 2px #e5ebe7'}
            w={'fit-content'}
            px={2}
            textAlign={'center'}
            bg={'scheme.light-rose'}
          >
            {title}
          </Text>
        </Flex>
        <Flex direction={'column'} alignItems="center">
          <Divider borderColor="scheme.light-rose" width={'80%'} />
        </Flex>
      </Link>
    </Box>
  );
};

export default DisplayCategoryCard;
