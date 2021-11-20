import styled from 'styled-components';
import {flexCenter, sizeCircle} from './Mixins';

export const Button = styled.button.attrs((props) => ({
  fontSize: props.fontSize ?? '1.4rem',
}))`
  ${flexCenter}
  font-size: ${({fontSize}) => fontSize};
  background: transparent;
  cursor: pointer;
  border: none;
  outline: none;
  color: inherit;
  text-align: center;
  text-decoration: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

export const HoverScaleButton = styled(Button).attrs(() => ({
  scaleNum: 1.2,
}))`
  transition: transform 0.2s ease-out;

  &:hover {
    transform: scale(${({scaleNum}) => scaleNum});
  }
`;

export const Dot = styled.span.attrs((props) => ({
  size: props.size ?? '4px',
  bgColor: props.bgColor ?? props.theme.colors.secondary,
}))`
  display: inline-block;
  ${({size}) => sizeCircle({size: size})};
  background-color: ${({bgColor}) => bgColor};
`;

export const CircleImg = styled.div.attrs((props) => ({
  bgColor: props.theme.colors.bgComponentLightTheme,
}))`
  ${({size}) => sizeCircle({size})}

  img {
    ${sizeCircle({size: '100%'})}
    object-fit: cover;
    background-color: ${({bgColor}) => bgColor};
  }
`;
