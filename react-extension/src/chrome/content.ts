import { ChromeMessage, Sender } from "../types";

type MessageResponse = (response?: any) => void;

const validateSender = (
	message: ChromeMessage,
	sender: chrome.runtime.MessageSender
) => {
	return sender.id === chrome.runtime.id && message.from === Sender.React;
};

interface Product {
	url?: string;
	store?: string;
	image?: string;
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
		// Store Name
		const storeName = (domain: string): string => {
			let parts = domain.split(".");
			if (parts[0] === "www") {
				parts.shift();
			}
			const name = parts[0];
			return name.charAt(0).toUpperCase() + name.slice(1);
		};

		product.store = storeName(window.location.hostname);
		// Fetching product title from the page
    // if store is amazon, productName should be the title of the product
    // else, productName should be the h1 of the page
		let productName = document.querySelector("h1")?.innerText;
    if(product.store === "Amazon") {
      const amazonProduct = document.querySelector("#productTitle") as HTMLHeadingElement;
      if(amazonProduct) {
        productName = amazonProduct.innerText;
      }
    }

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
						foundPrice = priceElement.textContent || "";
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
		};

		// Product URL
		let productUrl = window.location.href;
		product.url = productUrl;

		const imgGetter = (): string | undefined => {
			// check if store is amazon
      if(product.store === "Amazon") {
        const img = document.querySelector("#landingImage") as HTMLImageElement;
        if(img) {
          return img.src;
        }
      }
      // @ts-ignore
			for (let image of document.images) {
        if (image.height > 400 && !image.src.includes("LOADING")) {
          // if image.src string is less than 40 characters, it's probably a placeholder image, so get the first image that's not a placeholder
          if(image.src.length < 40) {
            return image.srcset.split(" ")[0];
          }

					return image.src;
				}
			}
		};
		const img = imgGetter();

		product.image = img;

		product.title = productName;
		if (productPrice) {
			product.price = priceToNumber(productPrice);
		}

		response(product);
	}
};

const main = () => {
	console.log("[content.ts] Main");
	/**
	 * Fired when a message is sent from either an extension process or a content script.
	 */
	chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
};

main();
