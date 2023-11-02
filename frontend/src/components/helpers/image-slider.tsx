'use client';

import React from 'react';
import { Box, IconButton, useBreakpointValue } from '@chakra-ui/react';
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
// And react-slick as our Carousel Lib
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
  pauseOnHover: true,
};

export default function ImageSlider({
  images,
  categoryId,
}: {
  images: string[];
  categoryId: number | undefined;
}) {
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = React.useState<Slider | null>(null);

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = '90%';
  const side = '5%';

  // These are the images used in the slide

  return (
    <Box
      position={'relative'}
      height={'250px'}
      width={'100%'}
      overflow={'hidden'}
    >
      {/* CSS files for react-slick */}
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      {/* Left Icon */}
      <IconButton
        aria-label="left-arrow"
        borderRadius="full"
        position="absolute"
        borderColor="scheme.dusty-rose"
        borderWidth={1}
        left={side}
        top={top}
        transform={'translate(0%, -50%)'}
        zIndex={5}
        size="xs"
        onClick={() => slider?.slickPrev()}
      >
        <BiLeftArrowAlt color="#c96a6c" size={20} />
      </IconButton>
      {/* Right Icon */}
      <IconButton
        aria-label="right-arrow"
        borderRadius="full"
        position="absolute"
        borderColor="scheme.dusty-rose"
        borderWidth={1}
        right={side}
        top={top}
        transform={'translate(0%, -50%)'}
        zIndex={5}
        size="xs"
        onClick={() => slider?.slickNext()}
      >
        <BiRightArrowAlt color="#c96a6c" size={20} />
      </IconButton>
      {/* Slider */}
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {images?.map((url, index) => (
          <Link to={`/category/${categoryId}`}>
            <Box
              key={index}
              height={'250px'}
              position="relative"
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
              backgroundSize="contain"
              backgroundImage={`url(${url})`}
            />
          </Link>
        ))}
      </Slider>
    </Box>
  );
}
