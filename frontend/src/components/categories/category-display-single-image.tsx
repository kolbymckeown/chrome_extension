import React from 'react';

import { Box, Grid } from '@chakra-ui/react';
import ImageWithFallback from '../helpers/image-fallback';

type CategoryDisplaySingleImageProps = {
  displayImage: string;
};

const CategoryDisplaySingleImage = ({
  displayImage,
}: CategoryDisplaySingleImageProps) => {
  return (
      <Box
        key={displayImage}
        borderWidth="1px"
        overflow="hidden"
        gridColumn="span 2"
        filter={'blur(2px)'}
      >
        <ImageWithFallback
          src={displayImage}
          alt={`Image ${displayImage}`}
          w={'250px'}
          h={'250px'}
        />
      </Box>
  );
};

export default CategoryDisplaySingleImage;
