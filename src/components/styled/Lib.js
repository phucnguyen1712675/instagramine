import styled from 'styled-components';
import {flexCenter} from './Mixins';

export const Button = styled.button.attrs((props) => ({
  fontSize: props.fontSize ?? '2.4rem',
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
