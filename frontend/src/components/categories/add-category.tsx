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
} from '@chakra-ui/react';

import { useMutation } from '@/hooks/use-query';


export const AddCategory = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();
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
    console.log({ data });
    addItem(
      { ...data },
      {
        onSuccess: () => {
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
      <Button colorScheme="primary" onClick={() => setIsOpen(true)}>
        Add Category
      </Button>

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
