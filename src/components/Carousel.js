import React from 'react';
import PropTypes from 'prop-types';
import LeftChevron from './icons/LeftChevron';
import RightChevron from './icons/RightChevron';
import {
  StyledCarousel,
  CarouselButton,
  CarouselTrackContainer,
  CarouselTrack,
  CarouselSlide,
  CarouselSlideImage,
} from './styled/Carousel.styled';
import {validateImageUrl} from '../utils/media';

const Carousel = ({media}) => {
  return (
    <StyledCarousel>
      <CarouselButton>
        <LeftChevron />
      </CarouselButton>
      <CarouselTrackContainer>
        <CarouselTrack>
          {media.map((item, index) => (
            <CarouselSlide key={index}>
              {validateImageUrl(item) ? (
                <CarouselSlideImage src={item} />
              ) : (
                <></>
              )}
            </CarouselSlide>
          ))}
        </CarouselTrack>
      </CarouselTrackContainer>
      <CarouselButton>
        <RightChevron />
      </CarouselButton>
    </StyledCarousel>
  );
};

Carousel.propTypes = {
  media: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Carousel;
