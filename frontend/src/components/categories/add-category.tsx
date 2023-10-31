import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

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
  useToast,
  Checkbox,
  Icon,
  Tooltip,
} from '@chakra-ui/react';

import { useMutation } from '@/hooks/use-query';
import { FaFolderPlus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import {
  addReduxCategory,
  fetchCategories,
} from '@/redux/slices/category.slice';
import { AppDispatch } from '@/redux/store';

export const AddCategory = ({ variant = 'button' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const { mutate: addItem } = useMutation(`categories`, {
    type: 'POST',
  });

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      title: '',
      isPublic: false,
    },
  });

  const onSubmit = (data: any) => {
    addItem(
      { ...data },
      {
        onSuccess: () => {
          dispatch(fetchCategories());
          toast({
            title: 'Item added.',
            description: 'Your category has been successfully added.',
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
      {variant === 'button' && (
        <Button
          color="scheme.dark-blue"
          variant="outline"
          border="none"
          rightIcon={<FaFolderPlus />}
          onClick={() => setIsOpen(true)}
        >
          Add Category
        </Button>
      )}
      {variant === 'icon' && (
        <Tooltip label="Add Category" aria-label="Add Category">
          <span>
            <Icon
              as={FaFolderPlus}
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
          <ModalHeader>Add new category</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Public</FormLabel>
                <Controller
                  name="isPublic"
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
                      Public
                    </Checkbox>
                  )}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="red"
                mr={3}
                onClick={() => {
                  setIsOpen(false);
                  reset();
                }}
              >
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
