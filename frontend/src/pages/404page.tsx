// src/components/NotFound.tsx
import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const NotFound: React.FC = () => {
  return (
    <Box textAlign="center" mt="40">
      <Text fontSize="4xl">404 - Page Not Found</Text>
      <Text fontSize="xl">
        Sorry, the page you are looking for does not exist.
      </Text>
    </Box>
  );
};

export default NotFound;
