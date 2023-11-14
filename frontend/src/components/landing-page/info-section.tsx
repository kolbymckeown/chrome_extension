import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { AiOutlinePlus } from 'react-icons/ai';

interface InfoSectionProps {
  imageUrl: string;
  imageAlt: string;
  title: string;
  description: string;
  reverse?: boolean;
}

export default function InfoSection({
  imageUrl,
  imageAlt,
  title,
  description,
  reverse = false,
}: InfoSectionProps) {
  const direction = useBreakpointValue({
    base: 'column',
    sm: 'column',
    md: 'column',
    lg: reverse ? 'row-reverse' : 'row',
  });

  return (
    <Flex
      // @ts-ignore
      direction={direction}
      align="center"
      textAlign={{ base: 'center', sm: 'left' }}
      mx="auto"
      width={['100%', '100%', '80%', '80%']}
      maxWidth="900px"
      justifyContent={'space-between'}
      mt={10}
    >
      <Box mb={{ base: 4, sm: 0 }}>
        <Image
          src={imageUrl}
          alt={imageAlt}
          minWidth="425px"
          minHeight="300px"
          mx={{ base: 'auto', sm: '0' }}
        />
      </Box>
      <Box
        ml={{ sm: reverse ? 0 : 6, md: reverse ? 0 : 8 }}
        mr={{ sm: reverse ? 6 : 0, md: reverse ? 8 : 0 }}
      >
        <Text fontWeight="bold" fontSize="3xl">
          {title}
        </Text>
        <Text mt={2} fontSize="xl">
          {description}
        </Text>
        <Button mt={2} rounded="3xl" colorScheme="accent">
          <Flex alignItems="center">
            <AiOutlinePlus />
            <Text ml={2}>Add To Chrome</Text>
          </Flex>
        </Button>
      </Box>
    </Flex>
  );
}
