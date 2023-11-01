import React, { ChangeEvent, FormEvent } from 'react';
import ImageWithFallback from '@/components/helpers/image-fallback';
import {
  Box,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  Button,
  Flex,
  Tooltip,
  IconButton,
} from '@chakra-ui/react';
import { CartItem } from '@/types/item';
import { FaArrowLeft, FaCheck } from 'react-icons/fa';

interface ProductCardEditProps {
  item: CartItem;
  onSave: (formData: CartItem) => void;
  onCancel: () => void;
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
}

const ProductCardEdit: React.FC<ProductCardEditProps> = ({
  item,
  onSave,
  onCancel,
  onChange,
}) => {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave({ ...item });
  };

  return (
    <form onSubmit={onSubmit}>
      <Box w="100%">
        <FormControl>
          <Input
            onChange={onChange}
            placeholder="Enter title"
            name="title"
            defaultValue={item.title}
            border={'none'}
            borderBottom={'1px solid'}
            borderColor={'scheme.main-green-blue'}
            borderRadius={'none'}
            color={'scheme.main-green-blue'}
            fontWeight={'700'}
            _focusVisible={{
              border: 'none',
              borderBottom: '1px solid',
              borderColor: 'scheme.main-green-blue',
            }}
            padding={'0'}
            h={'30px'}
          />
        </FormControl>
        <Flex>
          <FormControl>
            <Input
              onChange={onChange}
              placeholder="Enter store"
              name="store"
              defaultValue={item.store}
              border={'none'}
              borderBottom={'1px solid'}
              borderColor={'scheme.main-green-blue'}
              borderRadius={'none'}
              color={'scheme.main-green-blue'}
              fontWeight={'700'}
              _focusVisible={{
                border: 'none',
                borderBottom: '1px solid',
                borderColor: 'scheme.main-green-blue',
              }}
              padding={'0'}
              h={'30px'}
            />
          </FormControl>
          <FormControl>
            <InputGroup h={'30'} mb={3}>
              <InputLeftElement
                children="$"
                color={'scheme.main-green-blue'}
                h="30"
                left={'10px'}
              />
              <Input
                onChange={onChange}
                type="text"
                name="price"
                defaultValue={item.price}
                boxShadow="none"
                border={'none'}
                borderBottom={'1px solid'}
                borderColor={'scheme.main-green-blue'}
                borderRadius={'none'}
                color={'scheme.main-green-blue'}
                _focusVisible={{
                  border: 'none',
                  borderBottom: '1px solid',
                  borderColor: 'scheme.main-green-blue',
                }}
                h="30"
              />
            </InputGroup>
          </FormControl>
        </Flex>
        <Flex justify={'center'}>
          <ImageWithFallback
            src={item.image}
            alt={item.title}
            h="200px"
            w="200px"
          />
        </Flex>
        <FormControl mt={2}>
          <Textarea
            onChange={onChange}
            placeholder="Description"
            name="description"
            defaultValue={item.description}
            bg={'scheme.bg-green-blue'}
            size="sm"
            borderRadius={'lg'}
            minHeight={'none'}
            h={'50px'}
          />
        </FormControl>
        <Flex mt={2} justify="space-around">
          <Tooltip label={'Save'} aria-label="save-edit-item">
            <IconButton
              bg={'scheme.bg-green-blue'}
              aria-label="Purchased"
              color={'scheme.main-green-blue'}
              icon={<FaCheck />}
              borderRadius={'full'}
              type="submit"
            />
          </Tooltip>
          <Tooltip label={'Cancel'} aria-label="cancel-edit-item">
            <IconButton
              bg={'scheme.bg-green-blue'}
              aria-label="Purchased"
              color={'scheme.main-green-blue'}
              icon={<FaArrowLeft />}
              borderRadius={'full'}
              onClick={onCancel}
            />
          </Tooltip>
        </Flex>
      </Box>
    </form>
  );
};

export default ProductCardEdit;
