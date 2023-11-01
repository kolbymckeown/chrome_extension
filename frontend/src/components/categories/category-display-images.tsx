import React from 'react';

import { Box, Grid } from '@chakra-ui/react';
import ImageWithFallback from '../helpers/image-fallback';

type CategoryDisplayImagesProps = {
  displayImage: string;
};

const CategoryDisplayImages = ({
  displayImage,
}: CategoryDisplayImagesProps) => {
  return (
    <Grid templateColumns="repeat(2, 1fr)" w={'100%'} filter={'blur(2px)'}>
      <Box
        key={displayImage}
        borderWidth="1px"
        overflow="hidden"
        gridColumn="span 2"
      >
        <ImageWithFallback
          src={displayImage}
          alt={`Image ${displayImage}`}
          w={'300px'}
          h={'300px'}
        />
      </Box>
    </Grid>
  );
};

export default CategoryDisplayImages;
