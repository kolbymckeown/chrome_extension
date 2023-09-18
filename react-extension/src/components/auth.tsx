import React from "react";
import { Flex, Button, Text, VStack } from "@chakra-ui/react";

export default function Auth() {
	const handleLogin = () => {
		const loginUrl = `${process.env.REACT_APP_FRONTEND_URL}/session/login`;
		window.open(loginUrl, "_blank");
	};

	const handleSignUp = () => {
		const signUpUrl = `${process.env.REACT_APP_FRONTEND_URL}/session/register`;
		window.open(signUpUrl, "_blank");
	};

	return (
		<Flex
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			width="100%"
			height="100%"
			padding="1rem"
		>
			<Text fontSize="2xl" fontWeight="bold" marginBottom="1rem">
				Welcome
			</Text>
			<VStack spacing={4} width="100%">
				<Button colorScheme="primary" width="100%" onClick={handleLogin}>
					Login
				</Button>
				<Button colorScheme="accent" width="100%" onClick={handleSignUp}>
					Sign Up
				</Button>
			</VStack>
		</Flex>
	);
}
