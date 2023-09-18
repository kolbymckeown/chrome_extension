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
} from '@chakra-ui/react';
import { itemCategories } from '@/constants';
import { useMutation } from '@/hooks/use-query';
import { cartItemSchema } from '@/schemas';

export const AddItem = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();
  const {
    mutate: addItem,
    isLoading,
    isSuccess,
  } = useMutation(`cart-item`, {
    type: 'POST',
  });

  const { handleSubmit, control, reset } = useForm({
    resolver: yupResolver(cartItemSchema),
    defaultValues: {
      title: '',
      price: 0,
      description: '',
      image: '',
      category: 'unsorted',
      quantity: 1,
      purchased: false,
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
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
      <Button colorScheme="primary" onClick={() => setIsOpen(true)}>
        Add Item
      </Button>

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
                  name="category"
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
                    <NumberInput>
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