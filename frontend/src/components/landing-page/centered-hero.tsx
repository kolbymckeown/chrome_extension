import { Button, Flex, Icon, Text } from '@chakra-ui/react';
import { FaChrome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

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
      <Flex
        mt={5}
        display="flex"
        alignItems="center"
        justifyContent="center"
        _hover={{
          textDecoration: 'none',
        }}
      >
        {/* TODO: add to chrome link */}
        {/* <Link to="https://chromewebstore.google.com/detail/genius-chrome-extension/eieaglbljagkphoonaibnoeapaiglegl?hl=en&pli=1"> */}
        <Button
          colorScheme="accent"
          textTransform="uppercase"
          onClick={() =>
            window.open(
              'https://chromewebstore.google.com/detail/genius-chrome-extension/eieaglbljagkphoonaibnoeapaiglegl?hl=en&pli=1',
              '_blank'
            )
          }
        >
          <Icon as={FaChrome} mr={2} />
          Add to chrome - it's free
        </Button>
        {/* </Link> */}
      </Flex>
    </Flex>
  );
}
