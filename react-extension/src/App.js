/* global chrome */

import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import WishlistForm from "./Form";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
	useEffect(() => {
		// Check if running in a Chrome extension context
		if (chrome && chrome.cookies) {
			// Get all cookies
			chrome.cookies.getAll({}, function (allCookies) {
				console.log("All cookies:", allCookies);

				// Find the cookie named "current_user"
				const currentUserCookie = allCookies.find(
					(cookie) => cookie.name === "current_user"
				);

				if (currentUserCookie) {
					console.log("Found current_user cookie:", currentUserCookie);
				} else {
					console.log("current_user cookie not found");
				}
			});
		}
	}, []);

	return (
		<div className="App">
			<ChakraProvider>
				<WishlistForm />
			</ChakraProvider>
		</div>
	);
}

export default App;
