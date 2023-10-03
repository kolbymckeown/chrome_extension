import ConfirmationModal from '@/components/helpers/confirmation-modal';
import ImageWithFallback from '@/components/helpers/image-fallback';
import { useMutation } from '@/hooks/use-query';
import { CartItem } from '@/types/item';
import { formatCurrency } from '@/utils/price-formatter';
import {
  Badge,
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Spinner,
  Text,
  Textarea,
  Tooltip,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { FaCheck, FaEdit, FaMinus, FaTrash } from 'react-icons/fa';

export const ProductCard = ({ item }: { item: CartItem }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<CartItem>(item);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const toast = useToast();

  const { mutate: editItem, isLoading } = useMutation(`cart-item`, {
    type: 'PUT',
  });

  const { mutate: deleteItem } = useMutation(`cart-item`, {
    type: 'DELETE',
    query: { cartItemId: item.id },
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    editItem(
      { ...formData },
      {
        onSuccess: () => {
          toast({
            title: 'Item edited.',
            description: 'Your item has been successfully edited.',
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
      }
    );
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteItem({
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
  };

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
      m={2}
    >
      {isLoading && (
        <Flex position={'absolute'} top={'40%'}>
          <Spinner size={'lg'} color="scheme.main-green-blue" thickness="3px" />
        </Flex>
      )}
      {!isEditing ? (
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
                onClick={() => setIsEditing(true)}
              />
            </Tooltip>
            <Tooltip
              label={item.purchased ? 'Remove' : 'Purchased'}
              aria-label="Purchased"
            >
              <IconButton
                bg={'scheme.bg-green-blue'}
                aria-label="Purchased"
                color={'scheme.main-green-blue'}
                icon={item.purchased ? <FaMinus /> : <FaCheck />}
                borderRadius={'full'}
                onClick={() => {
                  editItem(
                    { ...formData, purchased: !item.purchased },
                    {
                      onSuccess: () => {
                        toast({
                          title: 'Item marked as purchased.',
                          description:
                            'Your item has been successfully marked as purchased.',
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
                    }
                  );
                }}
              />
            </Tooltip>
            <Tooltip label="Delete" aria-label="Deletes">
              <IconButton
                bg={'scheme.bg-green-blue'}
                aria-label="Delete"
                color={'scheme.main-green-blue'}
                icon={<FaTrash />}
                borderRadius={'full'}
                onClick={() => setModalIsOpen(true)}
              />
            </Tooltip>
            <ConfirmationModal
              isOpen={modalIsOpen}
              onClose={() => setModalIsOpen(false)}
              callback={() => handleDelete()}
              title={'Deleting product'}
            />
          </Flex>
        </>
      ) : (
        <form onSubmit={onSubmit}>
          <Box w="100%">
            <FormControl>
              <Input
                onChange={handleChange}
                placeholder="Enter title"
                name="title"
                defaultValue={item.title}
                // Add necessary input props
              />
            </FormControl>
            <FormControl mt={2}>
              <Input
                onChange={handleChange}
                placeholder="Enter store"
                name="store"
                defaultValue={item.store}
                // Add necessary input props
              />
            </FormControl>
            <FormControl mt={4}>
              <InputGroup>
                <InputLeftElement children="$" />
                <Input
                  onChange={handleChange}
                  type="text"
                  name="price"
                  defaultValue={item.price}
                  color="scheme.dark-blue"
                  border="1px solid"
                  borderColor="scheme.bg-green-blue"
                  borderRadius="none"
                  boxShadow="none"
                />
              </InputGroup>
            </FormControl>
            <Box h={'125'} w={'125'}>
              <ImageWithFallback src={item.image} alt={item.title} />
            </Box>
            <FormControl mt={2}>
              <Textarea
                onChange={handleChange}
                placeholder="Description"
                name="description"
                defaultValue={item.description}
                bg={'scheme.bg-green-blue'}
                size="sm"
                borderRadius={'lg'}
              />
            </FormControl>
            {/* Add more form fields as needed */}
            <Button
              bg="scheme.bg-green-blue"
              color={'scheme.main-green-blue'}
              type="submit"
              mt={3}
            >
              Save
            </Button>
          </Box>
        </form>
      )}
    </VStack>
  );
};
