import { ChromeMessage, Sender } from "../types";

type MessageResponse = (response?: any) => void

const validateSender = (
    message: ChromeMessage,
    sender: chrome.runtime.MessageSender
) => {
    return sender.id === chrome.runtime.id && message.from === Sender.React;
}


interface Product {
    url?: string;
    store?: string;
    img?: string;
    title?: string;
    price?: number;
}


const messagesFromReactAppListener = (
    message: ChromeMessage,
    sender: chrome.runtime.MessageSender,
    response: MessageResponse
) => {

    const isValidated = validateSender(message, sender);

    if (isValidated) {
        let product: Product = {};

        // Fetching product title from the page
        let productName = document.querySelector("h1")?.innerText;

        // Fetching product price from the page
        let priceSelectors: string[] = [
            '[data-at*="price"]',
            '[class*="price"]',
            '[id*="price"]',
            '[data-test*="price"]',
            '[data-automation*="price"]',
        ];

        let productPrice: string | undefined;
        let foundPrice: string | undefined;

        // Function to find text nodes with the $ sign
        const dollarFinder = (node: Node): string | undefined => {
            let child, next;
            if (node.nodeType === Node.TEXT_NODE) {
                if (
                    (node.nodeValue?.includes("$") || node.nodeValue?.includes("CAD")) &&
                    node.nodeValue.length < 40
                ) {
                    foundPrice = node.nodeValue;
                    return foundPrice;
                }
            } else {
                child = node.firstChild;
                while (child) {
                    next = child.nextSibling;
                    foundPrice = dollarFinder(child);
                    if (foundPrice) {
                        productPrice = foundPrice;
                        break;
                    }
                    child = next;
                }
            }
            return foundPrice;
        };

        // Function to find DOM elements with selectors from priceSelectors
        let priceFinder = function (): string | undefined {
            for (let selector of priceSelectors) {
                let priceElement = document.querySelector(selector);
                if (priceElement) {
                    if (priceElement.children.length === 0) {
                        foundPrice = priceElement.textContent || '';
                        return foundPrice;
                    } else {
                        dollarFinder(priceElement);
                        return foundPrice;
                    }
                }
            }
        };

        productPrice = priceFinder();

        // Function to convert price to a number
        const priceToNumber = (str: string): number | undefined => {
            let newStr = "";
            for (let char of str) {
                if (Number(char) || Number(char) === 0 || char === ".") {
                    newStr += char;
                }
            }
            return Number(newStr.trim());
        }

        // Product URL
        let productUrl = window.location.href;
        product.url = productUrl;

        // Store Name
        const storeName = (domain: string): string => {
            let first = domain.indexOf(".") + 1;
            let last = domain.lastIndexOf(".");
            let pre = domain.substring(first, last);
            const upper = pre.charAt(0).toUpperCase();
            const rest = pre.slice(1);
            const store = upper + rest;
            return store;
        };

        product.store = storeName(window.location.hostname);

        // const imgGetter = (): string | undefined => {
        //     for (let image of document.images) {
        //         if (image.height > 400 && !image.src.includes("LOADING")) {
        //             return image.src;
        //         }
        //     }
        // };
        // const img = imgGetter();
        // console.log("************", img);
        // product.img = img;
        console.log(document)
        product.title = productName;
        if (productPrice) {
            product.price = priceToNumber(productPrice);
        }

        response(product);
    }

}



const main = () => {
    console.log('[content.ts] Main')
    /**
     * Fired when a message is sent from either an extension process or a content script.
     */
    chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
}

main();


