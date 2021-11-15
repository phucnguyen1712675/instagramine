import styled from 'styled-components';
import {flexCenter} from './Mixins';

export const Button = styled.button.attrs((props) => ({
  fontSize: `${props.fontSize ?? '1.4'}rem`,
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
