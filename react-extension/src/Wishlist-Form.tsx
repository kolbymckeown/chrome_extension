import React, { useState, ChangeEvent, FormEvent } from "react";
import {
	Box,
	FormControl,
	FormLabel,
	Input,
	Textarea,
	Select,
	Button,
} from "@chakra-ui/react";
import { Product } from "./App";
import useQuery, { useMutation } from "./hooks/use-query";
import { title } from "process";

interface FormData {
	title?: string;
	price?: number;
	category?: string;
	image?: string;
	description?: string;
	store?: string;
}

interface WishlistProps {
	product: Product;
}

const WishlistForm = ({ product }: WishlistProps) => {
	const [formData, setFormData] = useState<FormData>(product);

	console.log("IN THE FORM", product);

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
	};

	const { data } = useQuery(`cart-item`, {
		query: { cartItemId: "all" },
	});

	console.log({ data });

	return (
		<Box p={8}>
			<form onSubmit={handleSubmit}>
				<FormControl>
					<FormLabel>Title</FormLabel>
					<Input
						type="text"
						name="title"
						value={formData.title}
						onChange={handleChange}
					/>
				</FormControl>
				<FormControl mt={4}>
					<FormLabel>Price</FormLabel>
					<Input
						type="text"
						name="price"
						value={formData.price}
						onChange={handleChange}
					/>
				</FormControl>
				<FormControl mt={4}>
					<FormLabel>Category</FormLabel>
					<Select
						name="category"
						value={formData.category}
						onChange={handleChange}
					>
						<option value="electronics">Electronics</option>
						<option value="clothing">Clothing</option>
						<option value="books">Books</option>
						{/* Add more categories here */}
					</Select>
				</FormControl>
				<FormControl mt={4}>
					<FormLabel>Image URL</FormLabel>
					<Input
						type="text"
						name="image"
						value={formData.image}
						onChange={handleChange}
					/>
				</FormControl>
				<FormControl mt={4}>
					<FormLabel>Description</FormLabel>
					<Textarea
						name="description"
						value={formData.description}
						onChange={handleChange}
					/>
				</FormControl>
				<FormControl mt={4}>
					<FormLabel>Store</FormLabel>
					<Input
						type="text"
						name="store"
						value={formData.store}
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
