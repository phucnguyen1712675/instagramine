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

export const HoverScaleButton = styled(Button)`
  transition: transform 0.2s ease-out;

  &:hover {
    transform: scale(1.2);
  }
`;

export const HoverBrighterButton = styled(Button).attrs(() => ({
  amount: 1.2,
}))`
  &:hover {
    filter: brightness(${({amount}) => amount});
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

export const PostImageWrapper = styled.div.attrs(() => ({
  paddingHorizontal: '5px',
}))`
  padding-left: ${({paddingHorizontal}) => paddingHorizontal};
  padding-right: ${({paddingHorizontal}) => paddingHorizontal};
`;

export const PostImage = styled.img`
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 15px;
  overflow: hidden;
`;
