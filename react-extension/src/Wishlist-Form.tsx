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
    InputGroup,
    InputLeftElement,
    Flex,
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
		<Box p={4}>
			<form onSubmit={handleSubmit}>
				<FormControl>
					<FormLabel color={'scheme.main-green-blue'}>Title</FormLabel>
					<Input
						type="text"
						name="title"
						value={formData?.title}
						onChange={handleChange}
                        color='scheme.dark-blue'
                        border='1px solid'
                        borderColor='scheme.bg-green-blue'
                        borderRadius='none'
                        boxShadow='none'
					/>
				</FormControl>
                <FormControl mt={4} color={'scheme.main-green-blue'}>
					{formData?.image && (
                        <Image
                            mt={4} 
                            src={formData.image}
                            alt="Product Image"
                            width={290} 
                            height={290}
                        />
                    )}
				</FormControl>
				<FormControl mt={4} >
					<FormLabel color={'scheme.main-green-blue'}>Price</FormLabel>
                    <InputGroup>
                    <InputLeftElement children="$"/>
					<Input
                        prefix="$"
						type="text"
						name="price"
						value={formData?.price}
						onChange={handleChange}
                        color='scheme.dark-blue'
                        border='1px solid'
                        borderColor='scheme.bg-green-blue'
                        borderRadius='none'
                        boxShadow='none'
                        />
                        </InputGroup>
				</FormControl>
				<FormControl mt={4}>
					<FormLabel color={'scheme.main-green-blue'}>Category</FormLabel>
					<Select
						name="categoryId"
						onChange={handleChange}
                        color='scheme.dark-blue'
                        border='1px solid'
                        borderColor='scheme.bg-green-blue'
                        borderRadius='none'
                        boxShadow='none'
					>
                        {categories?.categories.map((category) =>
                            <option value={category.id}>{category.title}</option>
                        )}
					</Select>
				</FormControl>
				<FormControl mt={4}>
					<FormLabel color={'scheme.main-green-blue'}>Description</FormLabel>
					<Textarea
                        placeholder="Add your own description"
						name="description"
						value={formData?.description}
						onChange={handleChange}
                        color='scheme.dark-blue'
                        border='1px solid'
                        borderColor='scheme.bg-green-blue'
                        borderRadius='none'
                        boxShadow='none'
					/>
				</FormControl>
				<FormControl mt={4}>
					<FormLabel color={'scheme.main-green-blue'}>Store</FormLabel>
					<Input
						type="text"
						name="store"
						value={formData?.store}
						onChange={handleChange}
                        color='scheme.dark-blue'
                        border='1px solid'
                        borderColor='scheme.bg-green-blue'
                        borderRadius='none'
                        boxShadow='none'
					/>
				</FormControl>
                <Flex mt={4} justifyContent="space-between">
				<Button mt={4} color='scheme.main-green-blue' type="submit">
					Add to Wishlist
				</Button>
                <Button mt={4} color='scheme.main-green-blue' onClick={()=> {
                    const home = `${process.env.REACT_APP_FRONTEND_URL}`;
                    window.open(home, "_blank");
                }}>
                    Visit Genie
                </Button>
                </Flex>
			</form>
		</Box>
	);
};

export default WishlistForm;
