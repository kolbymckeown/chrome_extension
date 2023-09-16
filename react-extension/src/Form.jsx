import React, { useState } from 'react';
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Select,
    Button,
} from '@chakra-ui/react';

const WishlistForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        category: '',
        image: '',
        description: '',
        store: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('hit', formData);
        // Handle form submission logic here

    };
    return (
        <Box p={3}>
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
