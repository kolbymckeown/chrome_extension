// LoadingScreen.js
import React from 'react';
import { Center, Spinner } from '@chakra-ui/react';

const LoadingScreen = () => {
  return (
    <Center h="100vh">
      <Spinner size="xl" color="teal.500" thickness="5px" />
    </Center>
  );
};

export default LoadingScreen;
