import React from 'react';
import ConfirmationModal from '@/components/helpers/confirmation-modal';
import ImageWithFallback from '@/components/helpers/image-fallback';
import { CartItem } from '@/types/item';
import { formatCurrency } from '@/utils/price-formatter';
import {
  Badge,
  Box,
  Flex,
  Heading,
  IconButton,
  Link,
  Spinner,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react';
import { FaCheck, FaEdit, FaMinus, FaTrash } from 'react-icons/fa';

interface ProductCardDisplayProps {
  item: CartItem;
  onEditClick: () => void;
  onDeleteClick: () => void;
  onTogglePurchased: () => void;
  isPurchasing: boolean;
  isModalOpen: boolean;
  closeModal: () => void;
  openModal: () => void;
  title: string;
}

const ProductCardDisplay: React.FC<ProductCardDisplayProps> = ({
  item,
  onEditClick,
  onDeleteClick,
  onTogglePurchased,
  isPurchasing,
  isModalOpen,
  closeModal,
  openModal,
  title,
}) => {
  return (
    <>
      {isPurchasing && (
        <Flex position={'absolute'} top={'40%'}>
          <Spinner size={'lg'} color="scheme.main-green-blue" thickness="3px" />
        </Flex>
      )}
      <>
        {item.purchased && (
          <Badge
            borderRadius="0px 7px 0px 7px"
            position="absolute"
            right={0}
            top={0}
            color="scheme.main-green-blue"
            backgroundColor={'scheme.bg-green-blue'}
          >
            Purchased
          </Badge>
        )}
        <Link href={item.url} target="_blank" w={'100%'}>
          <Heading
            fontWeight="700"
            size="md"
            color="scheme.main-green-blue"
            display="-webkit-box"
            overflow={'hidden'}
            style={{
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {item.title}
          </Heading>
          <Flex
            justifyContent={'space-between'}
            w="100%"
            color="scheme.main-green-blue"
          >
            <Text fontWeight="700">{item.store}</Text>
            <Text>{formatCurrency(item.price)}</Text>
          </Flex>
          <Box h={'225'} w={'225'}>
            <ImageWithFallback src={item.image} alt={item.title} />
          </Box>
        </Link>
        <Box
          borderRadius={'lg'}
          w={'100%'}
          mt={2}
          h={'50px'}
          p={1}
          bg={'scheme.bg-green-blue'}
          position="relative"
          overflow="hidden"
        >
          <Text
            fontSize="sm"
            color={item.description ? 'scheme.main-green-blue' : 'gray'}
            fontWeight={'700'}
            lineHeight="1.25"
            maxHeight="2.5em"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="normal"
            display="-webkit-box"
            style={{
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
            pl={2}
            pt={1}
          >
            {item.description ? item.description : 'Edit to add description'}
          </Text>
        </Box>
        <Flex justifyContent={'space-between'} w="100%">
          <Tooltip label="Edit" aria-label="Edit">
            <IconButton
              bg={'scheme.bg-green-blue'}
              aria-label="Edit"
              color={'scheme.main-green-blue'}
              icon={<FaEdit />}
              borderRadius={'full'}
              onClick={onEditClick}
            />
          </Tooltip>
          <Tooltip
            label={item.purchased ? 'Unmark purchased' : 'Mark Purchased'}
            aria-label="Purchased"
          >
            <IconButton
              bg={'scheme.bg-green-blue'}
              aria-label="Purchased"
              color={'scheme.main-green-blue'}
              icon={item.purchased ? <FaMinus /> : <FaCheck />}
              borderRadius={'full'}
              onClick={onTogglePurchased}
            />
          </Tooltip>
          <Tooltip label="Delete" aria-label="Deletes">
            <IconButton
              bg={'scheme.bg-green-blue'}
              aria-label="Delete"
              color={'scheme.main-green-blue'}
              icon={<FaTrash />}
              borderRadius={'full'}
              onClick={openModal}
            />
          </Tooltip>
          <ConfirmationModal
            isOpen={isModalOpen}
            onClose={closeModal}
            callback={onDeleteClick}
            title={title}
          />
        </Flex>
      </>
    </>
  );
};

export default ProductCardDisplay;
