import React, { ChangeEvent, FormEvent } from 'react';
import ImageWithFallback from '@/components/helpers/image-fallback';
import {
  Box,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
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
        <Flex justify={'center'}>
          <ImageWithFallback
            src={item.image}
            alt={item.title}
            h="250px"
            w="250px"
          />
        </Flex>
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
            px={2}
          />
        </FormControl>
        <Flex h={'27px'}>
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
              px={2}
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
                px={2}
                h="30"
              />
            </InputGroup>
          </FormControl>
        </Flex>

        <FormControl mt={2} textAlign={'center'}>
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
            w={'95%'}
            resize={'none'}
            _hover={{
              border: 'transparent',
            }}
            _focusVisible={{
              border: 'transparent',
            }}
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
              position={'absolute'}
              top={0}
              right={0}
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
              position={'absolute'}
              top={0}
              left={0}
            />
          </Tooltip>
        </Flex>
      </Box>
    </form>
  );
};

export default ProductCardEdit;
