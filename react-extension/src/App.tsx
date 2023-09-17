import React, { useEffect, useState } from 'react';
import './App.css';
import { getCurrentTabUId } from './chrome/utils';
import { ChromeMessage, Sender } from './types';
import { ChakraProvider } from '@chakra-ui/react';
import WishlistForm from './Wishlist-Form';

export type Product = {
    url?: string;
    store?: string;
    img?: string;
    title?: string;
    price?: number;
    description?: string
}

export default () => {

    const [responseFromContent, setResponseFromContent] = useState<Product>({
        url: '',
        store: '',
        img: '',
        title: '',
        price: 0,
        description: '',
    });


    useEffect(() => {
        getProductOnClick();
    }, []);

    const getProductOnClick = () => {
        const message: ChromeMessage = {
            from: Sender.React,
            message: "Hello from React",
        }

        getCurrentTabUId((id) => {
            id && chrome.tabs.sendMessage(
                id,
                message,
                (responseFromContentScript) => {
                    console.log("product", responseFromContentScript)
                    setResponseFromContent(responseFromContentScript);
                });
        });
    };

    return (
        <ChakraProvider>
            <WishlistForm product={responseFromContent} />
        </ChakraProvider>
    );
}
