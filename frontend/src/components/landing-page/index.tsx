import { Box, Flex, Image } from '@chakra-ui/react';
import LandingHeader from './header';
import CenteredHero from './centered-hero';
import InfoSection from './info-section';

const mockData = [
  {
    imageUrl: 'https://spatium.earth/feature.cfdac386.png',
    imageAlt: 'Description for image 1',
    title: 'Title 1',
    description: 'This is the description for item 1.',
  },
  {
    imageUrl: 'https://spatium.earth/sun-widget.460c42bc.png',
    imageAlt: 'Description for image 2',
    title: 'Title 2',
    description: 'This is the description for item 2.',
  },
  {
    imageUrl: 'https://spatium.earth/moon-widget.460a1bed.png',
    imageAlt: 'Description for image 3',
    title: 'Title 3',
    description: 'This is the description for item 3.',
  },
];

export default function LandingPage() {
  return (
    <Flex
      direction="column"
      minH="100vh"
      bgGradient="linear(to-b, #c96a6c, #4c8d99)"
    >
      {/* <LandingHeader /> */}
      <CenteredHero />
      {/* TODO: Replace with usage photos */}
      <Box mx="auto" mt={10} overflow={'hidden'}>
        <Image
          src="https://spatium.earth/03.608fd791.jpg"
          alt="Placeholder Image"
          width={'80%'}
          maxWidth="1200px"
          objectFit="contain"
          borderRadius={'3xl'}
          mx="auto"
        />
      </Box>
      {mockData.map((item, index) => (
        <InfoSection
          key={index}
          imageUrl={item.imageUrl}
          imageAlt={item.imageAlt}
          title={item.title}
          description={item.description}
          reverse={index % 2 !== 0}
        />
      ))}
    </Flex>
  );
}
