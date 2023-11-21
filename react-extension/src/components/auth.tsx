import React from "react";
import { Flex, Button, VStack, Image } from "@chakra-ui/react";

export default function Auth() {
	const handleLogin = () => {
		const loginUrl = `https://chrome-extension-dusky.vercel.app/session/login`;
		window.open(loginUrl, "_blank");
	};

	return (
		<Flex
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			width="100%"
			height="100vh"
			padding="1rem"
		>
      <Image
        w="100px"
        h="40px"
        src="/genius-modern-dark.png"
        alt="Genius Logo"
        mb={'10px'}
      />
			<VStack spacing={4} width="100%">
				<Button width="100%" onClick={handleLogin} textShadow={'3px 3px #ead2ce'} color="scheme.dusty-rose">
					Login
				</Button>
			</VStack>
		</Flex>
	);
}
