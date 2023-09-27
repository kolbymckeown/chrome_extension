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
      src={imageError ? '/shopping-bag.png' : src} // Use the fallbackSrc directly here
      alt={alt}
      onError={() => setImageError(true)} // Set imageError to true directly in onError
    />
  );
};

export default ImageWithFallback;
