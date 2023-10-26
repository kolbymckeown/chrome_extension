import React, { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Image,
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Select,
  Checkbox,
  useToast,
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CartItem } from '@/types/item';
import { cartItemSchema } from '@/schemas';
import { itemCategories } from '@/constants';
import { useMutation } from '@/hooks/use-query';

export const Item = ({ item }: { item: CartItem }) => {
  const [isEditing, setIsEditing] = useState(false);
  const toast = useToast();
  const { handleSubmit, control, reset } = useForm({
    resolver: yupResolver(cartItemSchema),
    defaultValues: item,
  });

  const {
    mutate: updateItem,
    isLoading,
    isSuccess,
  } = useMutation(`cart-item`, {
    type: 'PUT',
  });

  const {
    mutate: deleteItem,
    isLoading: isDeleting,
    isSuccess: isDeleteSuccess,
  } = useMutation(`cart-item`, {
    type: 'DELETE',
    query: { cartItemId: item.id },
  });

  const handleDelete = (data: number) => {
    deleteItem(
      { cartItemId: data },
      {
        onSuccess: () => {
          toast({
            title: 'Item deleted.',
            description: 'Your item has been deleted.',
            status: 'success',
            duration: 5000,
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
  };

  const onSubmit = (data: any) => {
    updateItem(
      {
        ...data,
        cartItemId: item.id,
      },
      {
        onSuccess: () => {
          toast({
            title: 'Item updated.',
            description: 'Your item has been updated.',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
          setIsEditing(false);
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
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} mb={4}>
      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Controller
              name="title"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Price</FormLabel>
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <NumberInput value={field.value}>
                  <NumberInputField {...field} />
                </NumberInput>
              )}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Description</FormLabel>
            <Controller
              name="description"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Image URL</FormLabel>
            <Controller
              name="image"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Category</FormLabel>
            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => (
                <Select {...field}>
                  {itemCategories.map((category, index) => (
                    <option key={index} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </Select>
              )}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Quantity</FormLabel>
            <Controller
              name="quantity"
              control={control}
              render={({ field }) => (
                <NumberInput value={field.value}>
                  <NumberInputField {...field} />
                </NumberInput>
              )}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Purchased</FormLabel>
            <Controller
              name="purchased"
              control={control}
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <Checkbox
                  isChecked={value}
                  onChange={(e) => onChange(e.target.checked)}
                  onBlur={onBlur}
                  name={name}
                  ref={ref}
                >
                  Purchased
                </Checkbox>
              )}
            />
          </FormControl>
          <Flex mt={4}>
            <Button type="submit" colorScheme="green" mr={3}>
              Save
            </Button>
            <Button onClick={() => setIsEditing(false)}>Cancel</Button>
          </Flex>
        </form>
      ) : (
        <>
          <Flex align="center">
            <Image boxSize="100px" src={item.image} alt={item.title} mr={4} />
            <Box>
              <Text fontSize="xl">{item.title}</Text>
              <Text>Price: ${item.price}</Text>
              <Text>Quantity: {item.quantity}</Text>
              <Text>Category: {item.categoryId}</Text>
              <Text>Description: {item.description}</Text>
              <Text>Purchased: {item.purchased ? 'Yes' : 'No'}</Text>
            </Box>
          </Flex>
          <Button mt={4} onClick={() => setIsEditing(true)}>
            Edit
          </Button>
          <Button mt={4} onClick={() => handleDelete(item.id)}>
            Delete
          </Button>
        </>
      )}
    </Box>
  );
};
