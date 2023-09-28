import { Flex, Image, Link } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function LandingHeader() {
  return (
    <Flex
      px={[5, 10, '100px']}
      py={10}
      justifyContent="space-between"
      w="100%"
      alignItems="center"
    >
      <Image w="150px" h="50px" src="/genius-logo.png" alt="Genius Logo" />
      <Link
        as={NextLink}
        href="#features"
        fontWeight="bold"
        fontSize="xl"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        Features
      </Link>
    </Flex>
  );
}
