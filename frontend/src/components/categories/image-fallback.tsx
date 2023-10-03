import React, { useState } from 'react';
import { Image } from '@chakra-ui/react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
}

const ImageWithFallback = ({ src, alt }: ImageWithFallbackProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <Image
      src={imageError ? '/shopping-bag.png' : src}
      alt={alt}
      onError={() => setImageError(true)}
    />
  );
};

export default ImageWithFallback;
