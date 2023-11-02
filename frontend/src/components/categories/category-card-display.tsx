import React, { useState } from 'react';
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
  Heading,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, HamburgerIcon } from '@chakra-ui/icons';
import ConfirmationModal from '../helpers/confirmation-modal';
import { Link } from 'react-router-dom';
import { useMutation } from '@/hooks/use-query';
import CategoryDisplayImages from './category-display-images';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReduxCategory } from '@/redux/slices/category.slice';
import { FaCaretLeft } from 'react-icons/fa';
import { selectItems } from '@/redux/slices/items.slice';
import { formatCurrency } from '@/utils/price-formatter';

interface DisplayCategoryCardProps {
  title: string;
  isPublic: boolean;
  displayImage: string;
  categoryId: number | undefined;
  setIsEditing: (value: boolean) => void;
  imagesForCategory: string[];
}

const DisplayCategoryCard = ({
  title,
  isPublic,
  displayImage,
  categoryId,
  setIsEditing,
  imagesForCategory,
}: DisplayCategoryCardProps) => {
  const [isModalOpen, setModalIsOpen] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch();
  const { mutate: deleteCategory } = useMutation(`categories`, {
    type: 'DELETE',
    query: { categoryId },
  });
  const [isHovering, setIsHovering] = useState(false);

  const items = useSelector(selectItems);
  const totalCategoryValue = items
    .filter((item) => item.categoryId === categoryId)
    .reduce((acc, item) => acc + item.price, 0);

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
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
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

      {/* private badge */}
      {!isPublic && (
        <Badge
          borderRadius="7px 0px 7px 0px"
          position="absolute"
          color="scheme.dusty-rose"
          top={0}
          right={0}
          backgroundColor={'scheme.light-rose'}
        >
          Private
        </Badge>
      )}
      <Flex alignItems="center" flexDirection="column" mt={7}>
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
          top={'40%'}
          textShadow={'2px 2px #e5ebe7'}
          w={'fit-content'}
          px={2}
          textAlign={'center'}
          bg={'scheme.light-rose'}
          position="absolute"
          zIndex={1}
          left={'50%'}
          transform={'translateX(-50%)'}
          // when isHovering is true, lets make the title transparent
          opacity={isHovering ? 0 : 1}
          transition={'opacity 0.25s ease-in-out'}
        >
          <Link to={`/category/${categoryId}`}>{title}</Link>
        </Text>
        <CategoryDisplayImages
          imagesForCategory={imagesForCategory}
          categoryId={categoryId}
        />
      </Flex>
      <Flex alignItems="center" direction={'column'}>
        <Divider borderColor="scheme.light-rose" width={'80%'} />
        <Flex alignItems={'center'}>
          <Box position="relative" right="40px">
            <FaCaretLeft color="#c96a6c" size="65px" />
          </Box>
          <Tooltip label="Cart Value" aria-label="Total Spent">
            <Text
              display={'inline-block'}
              width={'105px'}
              h={'38px'}
              bg={'scheme.dusty-rose'}
              borderRadius={'3px 4px 4px 3px'}
              boxShadow={'3px 3px pink'}
              position={'absolute'}
              color={'white'}
              fontWeight={'300'}
              right={'77px'}
              fontSize={'large'}
              lineHeight={'38px'}
              p={'0px 10px 0px 10px'}
              style={{
                // @ts-ignore
                textWrap: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {formatCurrency(totalCategoryValue) || '$0'}
            </Text>
          </Tooltip>
        </Flex>
      </Flex>
    </Box>
  );
};

export default DisplayCategoryCard;
