import { CartItem } from '@/types/item';
import { formatCurrency } from '@/utils/price-formatter';
import {
  Badge,
  Box,
  Flex,
  Heading,
  IconButton,
  Image,
  Link,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react';
import { FaCheck, FaEdit, FaTrash } from 'react-icons/fa';

export const ProductCard = ({ item }: { item: CartItem }) => {
  return (
    <VStack
      key={item.id}
      w="250px"
      h="425px"
      borderWidth="1px"
      borderRadius="lg"
      borderColor={'scheme.main-green-blue'}
      overflow="hidden"
      mb={5}
      align="center"
      p={3}
      pt={4}
      position="relative"
    >
      {item.purchased && (
        <Badge
          borderRadius="0px 7px 0px 7px"
          position="absolute"
          right={0}
          top={0}
          color="scheme.dusty-rose"
          backgroundColor={'scheme.light-rose'}
        >
          Purchased
        </Badge>
      )}
      <Link href={item.url} target="_blank" w={'100%'}>
        <Heading
          fontWeight="700"
          size="md"
          color="scheme.dark-blue"
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
          <Text fontWeight="700">{item.store}</Text>
          <Text>{formatCurrency(item.price)}</Text>
        </Flex>

        <Image
          h={'225'}
          w={'225'}
          objectFit="cover"
          src={item.image}
          alt={item.title}
        />
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
          color={item.description ? 'inherit' : 'gray'}
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
          />
        </Tooltip>
        <Tooltip label="Purchased" aria-label="Purchased">
          <IconButton
            bg={'scheme.bg-green-blue'}
            aria-label="Purchased"
            color={'scheme.main-green-blue'}
            icon={<FaCheck />}
            borderRadius={'full'}
          />
        </Tooltip>
        <Tooltip label="Delete" aria-label="Deletes">
          <IconButton
            bg={'scheme.bg-green-blue'}
            aria-label="Delete"
            color={'scheme.main-green-blue'}
            icon={<FaTrash />}
            borderRadius={'full'}
          />
        </Tooltip>
      </Flex>
    </VStack>
  );
};
