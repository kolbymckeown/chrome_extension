/* global chrome */
import React, { useEffect, useState } from "react";
import "./App.css";
import { getCurrentTabUId } from "./chrome/utils";
import { ChromeMessage, Sender } from "./types";
import { ChakraProvider, Flex, Spinner, Text } from "@chakra-ui/react";
import WishlistForm from "./Wishlist-Form";
import useQuery from "./hooks/use-query";

import theme from "./styles/theme";
import Auth from "./components/auth";
import { ErrorBoundary } from "react-error-boundary";

export type Product = {
	url?: string;
	store?: string;
	image?: string;
	title?: string;
	price?: number;
	description?: string;
	categoryId?: number;
};

export type Category = {
	id: string;
	title: string;
	isPublic: boolean;
};

export type Categories = {
	categories: Category[];
};

const App = () => {
	const [responseFromContent, setResponseFromContent] = useState<Product>({
		url: "",
		store: "",
		image: "",
		title: "",
		price: 0,
		description: "",
	});

	const {
		data: categories,
		isLoading,
		isError,
	} = useQuery<Categories>(`categories`, {
		query: { categoryId: "all" },
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
					(cookie) => cookie.name === "genius_user_auth_token"
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
		<ErrorBoundary
			fallback={
				<Text color="red.500" fontSize="xl">
					Something went wrong...
				</Text>
			}
		>
			<ChakraProvider theme={theme}>
				<Flex justifyContent="center" alignItems="center">
					{isLoading ? (
						<Spinner
							thickness="4px"
							speed="0.65s"
							emptyColor="gray.200"
							color="blue.500"
							size="xl"
						/>
					) : user ? (
						<WishlistForm
							product={responseFromContent}
							categories={categories}
						/>
					) : (
						<Auth />
					)}
				</Flex>
			</ChakraProvider>
		</ErrorBoundary>
	);
};

export default App;
