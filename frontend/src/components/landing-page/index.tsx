import { Box, Flex, Image } from '@chakra-ui/react';
import CenteredHero from './centered-hero';
import InfoSection from './info-section';

const mockData = [
  {
    imageUrl: 'adidas_screenshot.png',
    imageAlt: 'Adidas site screenshot',
    title: 'Shop popular brands - add to your wishlist',
    description:
      'One click opens our extension and opens the product info form.',
  },
  {
    imageUrl: 'apple_screenshot.png',
    imageAlt: 'Apple site screenshot',
    title: 'Pulls in product info',
    description: 'Takes relavent information and displays in editable form.',
  },
  {
    imageUrl: 'product_screenshot.png',
    imageAlt: 'Description for image 3',
    title: 'Checkout your wishlist in your organized categories',
    description:
      'View your wishlist in a clean and organized way. Create categories, make them private just for you, or share them with friends and family.',
  },
];

export default function LandingPage() {
  return (
    <Flex
      direction="column"
      minH="100vh"
      bgGradient="linear(to-b, #c96a6c, #4c8d99)"
      pb={10}
    >
      {/* <LandingHeader /> */}
      <CenteredHero />
      {/* TODO: Replace with usage photos */}
      <Box mx="auto" mt={10} overflow={'hidden'}>
        <Image
          src="category_screenshot.png"
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
