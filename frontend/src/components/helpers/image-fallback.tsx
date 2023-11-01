import React, { useState } from 'react';
import { Image } from '@chakra-ui/react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  h?: string;
  w?: string;
}

const ImageWithFallback = ({
  src,
  alt,
  h = '225px',
  w = '225px',
}: ImageWithFallbackProps) => {
  const [imageError, setImageError] = useState(false);
  return (
    <Image
      src={imageError || !src ? '/shopping-bag.png' : src}
      alt={alt}
      onError={() => setImageError(true)}
      h={h}
      w={w}
    />
  );
};

export default ImageWithFallback;
