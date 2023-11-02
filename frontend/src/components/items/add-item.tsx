import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {
  Flex,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  NumberInput,
  NumberInputField,
  Select,
  useToast,
  Checkbox,
  Icon,
  Tooltip,
} from '@chakra-ui/react';

import useQuery, { useMutation } from '@/hooks/use-query';
import { cartItemSchema } from '@/schemas';
import { FaCartPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategories } from '@/redux/slices/category.slice';
import { fetchCartItems } from '@/redux/slices/items.slice';
import { AppDispatch } from '@/redux/store';

export const AddItem = ({ variant = 'button' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const {
    mutate: addItem,
    isLoading,
    isSuccess,
  } = useMutation(`cart-item`, {
    type: 'POST',
  });

  const categories = useSelector(selectCategories);

  const { handleSubmit, control, reset } = useForm({
    resolver: yupResolver(cartItemSchema),
    defaultValues: {
      title: '',
      price: 0,
      description: '',
      image: '',
      quantity: 1,
      purchased: false,
      store: '',
    },
  });

  const onSubmit = (data: any) => {
    addItem(
      { ...data },
      {
        onSuccess: () => {
          toast({
            title: 'Item added.',
            description: 'Your item has been successfully added.',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          dispatch(fetchCartItems());
          setIsOpen(false);
          reset();
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
    <Flex direction="column" align="center">
      {variant === 'button' && (
        <Button
          color="white"
          variant="outline"
          border="none"
          _hover={{ color: 'scheme.dusty-rose', bg: 'white' }}
          fontSize={'lg'}
          rightIcon={<FaCartPlus />}
          onClick={() => setIsOpen(true)}
        >
          Add Item
        </Button>
      )}

      {variant === 'icon' && (
        <Tooltip label="Add Item" aria-label="Add Item">
          <span>
            <Icon
              as={FaCartPlus}
              color="scheme.dark-blue"
              cursor="pointer"
              w={6}
              h={6}
              onClick={() => setIsOpen(true)}
            />
          </span>
        </Tooltip>
      )}

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Item</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Store</FormLabel>
                <Controller
                  name="store"
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
                    <NumberInput>
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
                      {categories.map((category, index) => (
                        <option key={index} value={category.id}>
                          {category.title}
                        </option>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Purchased</FormLabel>
                <Controller
                  name="purchased"
                  control={control}
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                  }) => (
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
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={() => setIsOpen(false)}>
                Close
              </Button>
              <Button type="submit" colorScheme="green">
                Save
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
