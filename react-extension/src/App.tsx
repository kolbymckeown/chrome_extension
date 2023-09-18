/* global chrome */
import React, { useEffect, useState } from "react";
import "./App.css";
import { getCurrentTabUId } from "./chrome/utils";
import { ChromeMessage, Sender } from "./types";
import { ChakraProvider } from "@chakra-ui/react";
import WishlistForm from "./Wishlist-Form";
import { queryClient } from "./hooks/use-query";
import { QueryClientProvider } from "@tanstack/react-query";
import theme from "./styles/theme";
import Auth from "./components/auth";

export type Product = {
	url?: string;
	store?: string;
	img?: string;
	title?: string;
	price?: number;
	description?: string;
};

const App = () => {
	const [responseFromContent, setResponseFromContent] = useState<Product>({
		url: "",
		store: "",
		img: "",
		title: "",
		price: 0,
		description: "",
	});

	const [user, setUser] = useState<boolean>(false);

	useEffect(() => {
		getProductOnClick();
	}, []);

	useEffect(() => {
		// Check if running in a Chrome extension context
		if (chrome && chrome.cookies) {
			// Get all cookies
			chrome.cookies.getAll({}, function (allCookies) {
				console.log("All cookies:", allCookies);

				const currentUserAuthToken = allCookies.find(
					(cookie) => cookie.name === "user_auth_token"
				);

				if (currentUserAuthToken) {
					// set cookie for the chrome extension here
					console.log(
						// current date and time
						new Date().toLocaleString("en-US", { timeZone: "America/New_York" })
					);
					setUser(true);
				}
			});
		}
	}, []);

	const getProductOnClick = () => {
		const message: ChromeMessage = {
			from: Sender.React,
			message: "Hello from React",
		};

		getCurrentTabUId((id) => {
			id &&
				chrome.tabs.sendMessage(id, message, (responseFromContentScript) => {
					console.log("product", responseFromContentScript);
					setResponseFromContent(responseFromContentScript);
				});
		});
	};

	return (
		<QueryClientProvider client={queryClient}>
			<ChakraProvider theme={theme}>
				{user ? <WishlistForm product={responseFromContent} /> : <Auth />}
			</ChakraProvider>
		</QueryClientProvider>
	);
};

export default App;
