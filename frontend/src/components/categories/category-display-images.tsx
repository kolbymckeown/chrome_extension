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
    <Grid templateColumns="repeat(2, 1fr)" w={'100%'} filter={'blur(2px)'}>
      <Box
        key={filteredImages[0]}
        borderWidth="1px"
        overflow="hidden"
        gridColumn="span 2"
      >
        <ImageWithFallback
          src={filteredImages[0]}
          alt={`Image ${filteredImages[0]}`}
          w={'300px'}
          h={'300px'}
        />
      </Box>
    </Grid>
  );
};

export default CategoryDisplayImages;
