import React from 'react';
import ConfirmationModal from '@/components/helpers/confirmation-modal';
import ImageWithFallback from '@/components/helpers/image-fallback';
import { CartItem } from '@/types/item';
import { formatCurrency } from '@/utils/price-formatter';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Flex,
  Heading,
  IconButton,
  Link,
  Spinner,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { FaCheck, FaEdit, FaMinus, FaTrash } from 'react-icons/fa';
import { HamburgerIcon } from '@chakra-ui/icons';

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
  const [optionsOpen, setOptionsOpen] = React.useState(false);
  return (
    <>
      {isPurchasing && (
        <Flex position={'absolute'} top={'40%'} zIndex={10}>
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
            color="scheme.bg-green-blue"
            backgroundColor={'scheme.main-green-blue'}
            zIndex={10}
          >
            Purchased
          </Badge>
        )}

        <Accordion
          position={'absolute'}
          top={0}
          left={0}
          border={'transparent'}
          allowToggle
          zIndex={10}
          borderRadius={'0px 0px 10px 0px'}
          bg={'white'}
        >
          <AccordionItem>
            <h2>
              <AccordionButton
                _hover={{
                  backgroundColor: 'transparent',
                }}
                onClick={() => setOptionsOpen(!optionsOpen)}
              >
                <HamburgerIcon color={'scheme.main-green-blue'} />
              </AccordionButton>
            </h2>
            <AccordionPanel p={0}>
              <Flex direction={'column'}>
                <Tooltip label="Edit" aria-label="Edit">
                  <IconButton
                    bg={'transparent'}
                    aria-label="Edit"
                    color={'scheme.main-green-blue'}
                    icon={<FaEdit />}
                    borderRadius={'full'}
                    onClick={onEditClick}
                    _hover={{
                      bg: 'transparent',
                    }}
                  />
                </Tooltip>
                <Tooltip
                  label={item.purchased ? 'Unmark purchased' : 'Mark Purchased'}
                  aria-label="Purchased"
                >
                  <IconButton
                    bg={'transparent'}
                    aria-label="Purchased"
                    color={'scheme.main-green-blue'}
                    icon={item.purchased ? <FaMinus /> : <FaCheck />}
                    borderRadius={'full'}
                    onClick={onTogglePurchased}
                    _hover={{
                      bg: 'transparent',
                    }}
                  />
                </Tooltip>
                <Tooltip label="Delete" aria-label="Deletes">
                  <IconButton
                    bg={'transparent'}
                    aria-label="Delete"
                    color={'scheme.main-green-blue'}
                    icon={<FaTrash />}
                    borderRadius={'full'}
                    onClick={openModal}
                    _hover={{
                      bg: 'transparent',
                    }}
                  />
                </Tooltip>
                <ConfirmationModal
                  isOpen={isModalOpen}
                  onClose={closeModal}
                  callback={onDeleteClick}
                  title={title}
                />
              </Flex>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        <Link href={item.url} target="_blank" w={'100%'}>
          <Box filter={optionsOpen || isPurchasing ? 'blur(1px)' : 'none'}>
            <ImageWithFallback
              src={item.image}
              alt={item.title}
              h="250px"
              w="250px"
            />
          </Box>
          <Box p={2}>
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
            <Flex justifyContent={'space-between'} w="100%">
              <Text
                fontWeight={item?.store ? '700' : '500'}
                color={item?.store ? 'scheme.main-green-blue' : 'gray'}
              >
                {item.store ? item.store : 'Add Store'}
              </Text>
              <Text color={'scheme.main-green-blue'}>
                {formatCurrency(item.price)}
              </Text>
            </Flex>
          </Box>
        </Link>

        <Box
          borderRadius={'lg'}
          w={'95%'}
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
            minH={'40px'}
            style={{
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
            cursor={'default'}
            pl={2}
            pt={1}
          >
            {item.description ? item.description : 'Edit to add description'}
          </Text>
        </Box>
      </>
    </>
  );
};

export default ProductCardDisplay;
