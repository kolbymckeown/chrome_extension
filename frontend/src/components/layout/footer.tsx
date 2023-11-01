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
} from '@chakra-ui/react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

// const links = [
//   'Blog',
//   'Documentation',
//   'Careers',
//   'Sign up',
//   'Terms of use',
//   'Privacy policy',
// ];
const accounts = [
  {
    url: 'https://github.com/noahnovickf',
    label: 'Github Account - Noah Novick',
    type: 'gray',
    icon: <FaGithub />,
  },
  {
    url: 'https://github.com/kolbymckeown',
    label: 'Github Account - Kolby McKeown',
    type: 'gray',
    icon: <FaGithub />,
  },
];

const Footer = () => {
  return (
    <Stack
      maxW="5xl"
      marginInline="auto"
      p={8}
      direction={{ base: 'column', md: 'row' }}
      justify={'center'}
    >
      <Link href="/">
        <Image w="100px" src="/genius-logo.png" alt="Genius Logo" />
      </Link>

      <HStack
        direction="row"
        spacing={5}
        alignItems="center"
        justifySelf="flex-end"
        position={'absolute'}
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
    </Stack>
  );
};

export default Footer;
