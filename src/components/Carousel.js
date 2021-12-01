import {useState} from 'react';
import PropTypes from 'prop-types';
import LeftChevron from './icons/LeftChevron';
import RightChevron from './icons/RightChevron';
import {
  StyledCarousel,
  CarouselButton,
  CarouselLeftButtonWrapper,
  CarouselRightButtonWrapper,
  CarouselSlide,
  CarouselSlideImage,
  CarouselNav,
  CarouselIndicator,
} from './styled/Carousel.styled';
import {validateImageUrl} from '../utils/media';

const Carousel = ({media}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = media.map((item, index) => (
    <CarouselSlide key={index} isActive={index === currentSlide}>
      {validateImageUrl(item.url) ? (
        <CarouselSlideImage src={item.url} />
      ) : (
        <></>
      )}
    </CarouselSlide>
  ));

  const mediaLength = media.length;
  const carouselIndicators = [];

  for (let i = 0; i < mediaLength; i++) {
    carouselIndicators.push(
      <CarouselIndicator key={i} isActive={i === currentSlide} />
    );
  }

  const prevItemHandler = () => {
    setCurrentSlide((currentSlide) => currentSlide - 1);
  };

  const nextItemHandler = () => {
    setCurrentSlide((currentSlide) => currentSlide + 1);
  };

  return (
    <StyledCarousel>
      {slides}
      {currentSlide > 0 && (
        <CarouselLeftButtonWrapper onClick={prevItemHandler}>
          <CarouselButton>
            <LeftChevron />
          </CarouselButton>
        </CarouselLeftButtonWrapper>
      )}
      {currentSlide < mediaLength - 1 && (
        <CarouselRightButtonWrapper onClick={nextItemHandler}>
          <CarouselButton>
            <RightChevron />
          </CarouselButton>
        </CarouselRightButtonWrapper>
      )}
      <CarouselNav>{carouselIndicators}</CarouselNav>
    </StyledCarousel>
  );
};

Carousel.propTypes = {
  media: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Carousel;
