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
} from '@chakra-ui/react';
import { CartItem } from '@/types/item';

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
          />
        </FormControl>
        <FormControl mt={2}>
          <Input
            onChange={onChange}
            placeholder="Enter store"
            name="store"
            defaultValue={item.store}
          />
        </FormControl>
        <FormControl mt={4}>
          <InputGroup>
            <InputLeftElement children="$" />
            <Input
              onChange={onChange}
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
            onChange={onChange}
            placeholder="Description"
            name="description"
            defaultValue={item.description}
            bg={'scheme.bg-green-blue'}
            size="sm"
            borderRadius={'lg'}
          />
        </FormControl>
        <Button
          bg="scheme.bg-green-blue"
          color={'scheme.main-green-blue'}
          type="submit"
          mt={3}
        >
          Save
        </Button>
        <Button
          bg="scheme.bg-green-blue"
          color={'scheme.main-green-blue'}
          onClick={onCancel}
          mt={3}
        >
          Cancel
        </Button>
      </Box>
    </form>
  );
};

export default ProductCardEdit;
