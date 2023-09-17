import React, { useEffect, useState } from 'react';
import './App.css';
import { getCurrentTabUId } from './chrome/utils';
import { ChromeMessage, Sender } from './types';
import { ChakraProvider } from '@chakra-ui/react';
import WishlistForm from './Wishlist-Form';

export default () => {

    const [url, setUrl] = useState<string | undefined>('');
    const [responseFromContent, setResponseFromContent] = useState<string>('');


    useEffect(() => {
        const queryInfo = { active: true, lastFocusedWindow: true };

        chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
            const url = tabs[0].url;
            setUrl(url);
        });
    }, []);

    const sendTestMessage = () => {
        const message: ChromeMessage = {
            from: Sender.React,
            message: "Hello from React",
        }

        getCurrentTabUId((id) => {
            id && chrome.tabs.sendMessage(
                id,
                message,
                (responseFromContentScript) => {
                    setResponseFromContent(responseFromContentScript);
                });
        });
    };

    return (
        <ChakraProvider>
            <WishlistForm />
        </ChakraProvider>
    );
}
