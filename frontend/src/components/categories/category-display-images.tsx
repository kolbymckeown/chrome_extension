import React from 'react';

import { Box, Flex, Grid } from '@chakra-ui/react';
import ImageWithFallback from '../helpers/image-fallback';

type CategoryDisplayImagesProps = {
  filteredImages: string[];
};

const CategoryDisplayImages = ({
  filteredImages,
}: CategoryDisplayImagesProps) => {
  return (
    <Grid templateColumns="repeat(2, 1fr)" w={'100%'}>
      {filteredImages.length > 3 ? (
        filteredImages.map((image: string, i: number) => (
          <Box key={i} overflow="hidden" w={'130px'} h={'130px'}>
            <ImageWithFallback
              src={image}
              alt={`Image ${image} `}
              w="130px"
              h="130px"
            />
          </Box>
        ))
      ) : (
        <Box
          key={filteredImages[0]}
          borderWidth="1px"
          overflow="hidden"
          gridColumn="span 2"
        >
          <ImageWithFallback
            src={filteredImages[0]}
            alt={`Image ${filteredImages[0]}`}
            w={'260px'}
            h={'260px'}
          />
        </Box>
      )}
    </Grid>
  );
};

export default CategoryDisplayImages;
