import styled from 'styled-components';
import {circle} from './Mixins';

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
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

export const HoverBrighterButton = styled(Button)`
  --amount: 1.2;
  &:hover {
    filter: brightness(var(--amount));
  }
`;

export const Dot = styled.span`
  --size: 4px;
  display: inline-block;
  ${circle({w: 'var(--size)'})};
  background-color: ${({theme}) => theme.colors.secondary};
`;

export const CircleImg = styled.div`
  --size: 4rem;
  ${circle({w: 'var(--size)'})}

  img {
    ${circle}
    object-fit: cover;
    background-color: ${({theme}) => theme.colors.bgComponentLightTheme};
  }
`;

export const PostMediaWrapper = styled.div`
  --padding-horizontal: 5px;
  padding-left: var(--padding-horizontal);
  padding-right: var(--padding-horizontal);
`;

export const PostImage = styled.img`
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 15px;
  overflow: hidden;
`;

export const Input = styled.input.attrs(() => ({
  type: 'text',
}))`
  padding: 0 50px;
  font-size: 1.8rem;
  font-weight: 400;
  color: ${({theme}) => theme.colors.blueAlphaAction};
  background: #f8fbff;
  box-shadow: inset 0px 4px 40px rgba(175, 193, 217, 0.12);
  border-radius: 8px;

  &:focus {
    outline: 1px solid ${({theme}) => theme.colors.blueAlphaAction};
  }
`;
