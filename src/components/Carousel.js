import {useState} from 'react';
import PropTypes from 'prop-types';
import {LeftChevronIcon, RightChevronIcon} from './icons';
import PostMedia from './PostMedia';
import {
  StyledCarousel,
  CarouselButton,
  CarouselLeftButtonWrapper,
  CarouselRightButtonWrapper,
  CarouselSlide,
  CarouselNav,
  CarouselIndicator,
} from './styled/Carousel.styled';

const Carousel = ({media}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = media.map((item, index) => (
    <CarouselSlide key={index} $isActive={index === currentSlide}>
      <PostMedia type={item.type} url={item.url} />
    </CarouselSlide>
  ));

  const mediaLength = media.length;
  const carouselIndicators = [];

  for (let i = 0; i < mediaLength; i++) {
    carouselIndicators.push(
      <CarouselIndicator key={i} $isActive={i === currentSlide} />
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
          <CarouselButton shape="circle" disabledHover>
            <LeftChevronIcon />
          </CarouselButton>
        </CarouselLeftButtonWrapper>
      )}
      {currentSlide < mediaLength - 1 && (
        <CarouselRightButtonWrapper onClick={nextItemHandler}>
          <CarouselButton shape="circle" disabledHover>
            <RightChevronIcon />
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
