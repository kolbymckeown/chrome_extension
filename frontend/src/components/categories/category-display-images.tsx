import React from 'react';

import { Box, Grid } from '@chakra-ui/react';
import ImageWithFallback from '../helpers/image-fallback';
import ImageSlider from '../helpers/image-slider';

type CategoryDisplayImagesProps = {
  imagesForCategory: string[];
  categoryId: number | undefined;
};

const CategoryDisplayImages = ({
  imagesForCategory,
  categoryId,
}: CategoryDisplayImagesProps) => {
  return (
    <Box width="250px">
      <ImageSlider images={imagesForCategory} categoryId={categoryId} />
    </Box>
  );
};

export default CategoryDisplayImages;
