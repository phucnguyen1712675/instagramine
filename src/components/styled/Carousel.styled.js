import styled, {css} from 'styled-components';
import {Button, PostImageWrapper, PostImage} from './Lib';
import {sizeCircle, flexCenter} from './Mixins';

const CarouselButtonWrapper = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding: 16px 8px;
  cursor: pointer;
`;

export const CarouselButton = styled(Button)`
  ${sizeCircle({size: '2.4rem'})}
  color: rgba(0, 0, 0, 0.5);
  font-size: 1rem;
  background-color: rgba(255, 255, 255, 0.8);

  ${CarouselButtonWrapper}:hover & {
    background-color: rgba(255, 255, 255, 1);
  }
`;

export const CarouselLeftButtonWrapper = styled(CarouselButtonWrapper)``;

export const CarouselRightButtonWrapper = styled(CarouselButtonWrapper)``;

export const StyledCarousel = styled(PostImageWrapper)`
  ${flexCenter({direction: 'column'})};
  position: relative;

  ${CarouselLeftButtonWrapper} {
    left: ${({paddingHorizontal}) => paddingHorizontal};
  }

  ${CarouselRightButtonWrapper} {
    right: ${({paddingHorizontal}) => paddingHorizontal};
  }
`;

const hideComponent = css`
  display: none;
`;

export const CarouselSlide = styled.div`
  ${({isActive}) => !isActive && hideComponent};
`;

export const CarouselSlideImage = styled(PostImage)``;

export const CarouselSlideVideo = styled.video``;

export const CarouselNav = styled.div`
  display: flex;
  column-gap: 4px;
  margin-top: 6px;
`;

export const CarouselIndicator = styled.span`
  display: inline-block;
  ${sizeCircle({size: '0.6rem'})}
  background-color: ${({isActive, theme}) =>
    isActive ? theme.colors.link : theme.colors.secondary};
`;
