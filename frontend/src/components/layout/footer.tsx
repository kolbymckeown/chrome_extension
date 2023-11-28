import {
  Stack,
  HStack,
  Link,
  Divider,
  Image,
  IconButton,
  LinkProps,
  Tooltip,
  Flex,
  Icon,
  Button,
} from '@chakra-ui/react';
import { FaChrome, FaGithub, FaLinkedin } from 'react-icons/fa';

const accounts = [
  {
    url: 'https://github.com/noahnovickf',
    label: 'Github Account - Noah Novick',
    type: 'gray',
    icon: <FaGithub />,
  },
  {
    url: 'https://www.linkedin.com/in/noah-novick-821837186/',
    label: 'LinkedIn Account - Noah Novick',
    type: 'blue',
    icon: <FaLinkedin />,
  },
  {
    url: 'https://github.com/kolbymckeown',
    label: 'Github Account - Kolby McKeown',
    type: 'gray',
    icon: <FaGithub />,
  },
  {
    url: 'https://www.linkedin.com/in/kolbymckeown/',
    label: 'LinkedIn Account - Kolby McKeown',
    type: 'blue',
    icon: <FaLinkedin />,
  },
];

const Footer = () => {
  return (
    <Stack
      as="footer"
      maxW="7xl"
      marginInline="auto"
      p={8}
      direction={{ base: 'column', md: 'row' }}
      justify={'space-between'}
    >
      <Flex direction="column" w="100%">
        <Divider mb={'10px'} />
        <Flex w="100%" justify="space-between">
          <Button
            ml={5}
            colorScheme="blue"
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
          <Link href="/">
            <Image
              w="100px"
              h="40px"
              src="/genius-modern-dark.png"
              alt="Genius Logo"
            />
          </Link>

          <HStack
            direction="row"
            spacing={5}
            alignItems="center"
            justifySelf="flex-end"
            right={'10'}
          >
            {accounts.map((sc, index) => (
              <Tooltip key={index} label={sc.label} aria-label={sc.label}>
                <IconButton
                  key={index}
                  as={Link}
                  isExternal
                  href={sc.url}
                  aria-label={sc.label}
                  colorScheme={sc.type}
                  icon={sc.icon}
                  rounded="md"
                />
              </Tooltip>
            ))}
          </HStack>
        </Flex>
      </Flex>
    </Stack>
  );
};

export default Footer;
