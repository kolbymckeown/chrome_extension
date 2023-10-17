import { Button, Flex, Icon, Link, Text } from '@chakra-ui/react';
import { FaChrome } from 'react-icons/fa';
import NextLink from 'next/link';

export default function CenteredHero() {
  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      maxWidth="600px"
      mx="auto"
      mt={5}
      px={[5, 5, 5, 'unset']}
    >
      <Text
        fontSize={['3xl', '4xl', '5xl']}
        textAlign="center"
        fontWeight="bold"
      >
        The shopping list you've been waiting for.
      </Text>
      <Text fontSize={['xl', '1xl', '2xl']} mt={5} textAlign="center">
        Your custom curated shopping list to keep track of those items you've
        been wanting!
      </Text>
      <Link
        as={NextLink}
        href="/session/login"
        mt={5}
        display="flex"
        alignItems="center"
        justifyContent="center"
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Button colorScheme="accent" textTransform="uppercase">
          <Icon as={FaChrome} mr={2} />
          Add to chrome - it's free
        </Button>
      </Link>
    </Flex>
  );
}
