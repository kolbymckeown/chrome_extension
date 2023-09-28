import { Flex } from '@chakra-ui/react';
import LandingHeader from './header';
import CenteredHero from './centered-hero';

export default function LandingPage() {
  return (
    <Flex
      direction="column"
      minH="100vh"
      bgGradient="linear(to-b, #c96a6c, #4c8d99)"
    >
      <LandingHeader />
      <CenteredHero />
    </Flex>
  );
}
