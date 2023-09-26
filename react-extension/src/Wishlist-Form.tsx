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

const WishlistForm = ({ product, categories = { categories: [] } }: WishlistProps) => {
	const [formData, setFormData] = useState<FormData>({...product, categoryId: categories?.categories[0]?.id});

    useEffect(() => {
        setFormData({...product, categoryId: categories?.categories[0]?.id});
    }, [product, categories]); // Add 'product' as a dependency to listen for changes

    const {
        mutate: addItem,
        isLoading,
        isSuccess,
      } = useMutation(`cart-item`, {
        type: 'POST',
      });
    
	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// Handle form submission logic here
		console.log(formData);
        addItem({...formData})
	};
    
    console.log('FORMDATA', formData)

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
                        style={{
                            color: '#1b243d',
                            border: '1px solid #e5ebe7', // Customize the border color and style
                            borderRadius: '0', // Optional: Remove any border-radius
                            boxShadow: 'none', // Optional: Remove any box shadows
                          }}
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
                        style={{
                            color: '#1b243d',
                            border: '1px solid #e5ebe7', // Customize the border color and style
                            borderRadius: '0', // Optional: Remove any border-radius
                            boxShadow: 'none', // Optional: Remove any box shadows
                        }}
                        />
                        </InputGroup>
				</FormControl>
				<FormControl mt={4}>
					<FormLabel color={'scheme.main-green-blue'}>Category</FormLabel>
					<Select
						name="categoryId"
						onChange={handleChange}
                        style={{
                            color: '#1b243d',
                            border: '1px solid #e5ebe7', // Customize the border color and style
                            borderRadius: '0', // Optional: Remove any border-radius
                            boxShadow: 'none', // Optional: Remove any box shadows
                          }}
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
                        style={{
                            color: '#1b243d',
                            border: '1px solid #e5ebe7', // Customize the border color and style
                            borderRadius: '0', // Optional: Remove any border-radius
                            boxShadow: 'none', // Optional: Remove any box shadows
                          }}
					/>
				</FormControl>
				<FormControl mt={4}>
					<FormLabel color={'scheme.main-green-blue'}>Store</FormLabel>
					<Input
						type="text"
						name="store"
						value={formData?.store}
						onChange={handleChange}
                        style={{
                            color: '#1b243d',
                            border: '1px solid #e5ebe7', // Customize the border color and style
                            borderRadius: '0', // Optional: Remove any border-radius
                            boxShadow: 'none', // Optional: Remove any box shadows
                          }}
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
