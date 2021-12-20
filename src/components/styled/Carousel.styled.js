import styled from 'styled-components';
import {PostMediaWrapper} from './Lib';
import {circle} from './Mixins';
import Button from '../Button';

const CarouselButtonWrapper = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding: 16px 8px;
  cursor: pointer;
`;

export const CarouselButton = styled(Button)`
	--size: 2.4rem;
	width: var(--size);
	height: var(--size);
  border-color: transparent;
  font-size: 1rem;
  padding: 0;
  color: rgba(0, 0, 0, 0.5);
  background-color: rgba(255, 255, 255, 0.8);

  ${CarouselButtonWrapper}:hover & {
    background-color: rgba(255, 255, 255, 1);
  }
`;

export const CarouselLeftButtonWrapper = styled(CarouselButtonWrapper)`
  left: var(--padding-horizontal);
`;

export const CarouselRightButtonWrapper = styled(CarouselButtonWrapper)`
  right: var(--padding-horizontal);
`;

export const StyledCarousel = styled(PostMediaWrapper)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`;

export const CarouselSlide = styled.div`
  width: 100%;
  ${({$isActive}) => !$isActive && 'display: none;'};
`;

export const CarouselNav = styled.div`
  display: flex;
  column-gap: 4px;
  margin-top: 10px;
`;

export const CarouselIndicator = styled.span`
  display: inline-block;
  ${circle({w: '0.6rem'})}
  background-color: ${({$isActive, theme}) =>
    $isActive ? theme.colors.link : theme.colors.secondary};
`;
