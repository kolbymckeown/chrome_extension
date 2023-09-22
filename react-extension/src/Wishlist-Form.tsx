import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Button,
  Image,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Categories, Product } from "./App";
import { useMutation } from "./hooks/use-query";

interface FormData {
  title?: string;
  price?: number;
  categoryId?: string;
  image?: string;
  description?: string;
  store?: string;
}

interface WishlistProps {
  product: Product;
  categories?: Categories;
}

const WishlistForm = ({
  product,
  categories = { categories: [] },
}: WishlistProps) => {
  const [formData, setFormData] = useState<FormData>({
    ...product,
    categoryId: categories?.categories[0]?.id,
  });

  useEffect(() => {
    setFormData({ ...product, categoryId: categories?.categories[0]?.id });
  }, [product, categories]); // Add 'product' as a dependency to listen for changes
  const toast = useToast();

  const {
    mutate: addItem,
    isLoading,
    isSuccess,
    isError,
  } = useMutation(`cart-item`, {
    type: "POST",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addItem(
      { ...formData },
      {
        onSuccess: () => {
          toast({
            title: "Item added.",
            description: "Your item has been successfully added.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        },
        onError: () => {
          toast({
            title: "Error",
            description: "Something went wrong.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        },
      }
    );
  };

  if (isLoading) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    );
  }

  if (isError) {
    <Text fontSize="xl" color="red.500">
      Something went wrong...
    </Text>;
  }

  return (
    <Box p={8}>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            name="title"
            value={formData?.title}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Price</FormLabel>
          <Input
            type="text"
            name="price"
            value={formData?.price}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Category</FormLabel>
          <Select name="categoryId" onChange={handleChange}>
            {categories?.categories.map((category) => (
              <option value={category.id}>{category.title}</option>
            ))}
          </Select>
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Image URL</FormLabel>
          {formData?.image && (
            <Image
              mt={4} // You can adjust the margin as needed
              src={formData.image}
              alt="Product Image"
              width={200} // Adjust the width as needed
              height={200} // Adjust the height as needed
            />
          )}
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Description</FormLabel>
          <Textarea
            name="description"
            value={formData?.description}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Store</FormLabel>
          <Input
            type="text"
            name="store"
            value={formData?.store}
            onChange={handleChange}
          />
        </FormControl>
        <Button mt={4} colorScheme="teal" type="submit">
          Add to Wishlist
        </Button>
      </form>
    </Box>
  );
};

export default WishlistForm;
