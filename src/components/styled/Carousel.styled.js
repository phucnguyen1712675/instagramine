import styled from 'styled-components';
import {HoverBrighterButton} from './Lib';
import {sizeCircle} from './Mixins';

export const StyledCarousel = styled.div``;

export const CarouselButton = styled(HoverBrighterButton)`
  ${sizeCircle({size: '3rem'})}
	font-size: 1.2rem;
`;

export const CarouselTrackContainer = styled.div``;

export const CarouselTrack = styled.ul``;

export const CarouselSlide = styled.li``;

export const CarouselSlideImage = styled.img``;

export const CarouselSlideVideo = styled.video``;
