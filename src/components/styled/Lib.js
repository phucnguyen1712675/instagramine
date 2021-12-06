import styled, {css} from 'styled-components';
import {circle, brighterHover} from './Mixins';

export const Button = styled.button.attrs(() => ({
  type: 'button',
  disabled: false,
}))`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 15px;
  font-size: 1.4rem;
  font-weight: 400;
  background: transparent;
  overflow: hidden;
  text-transform: none;
  cursor: pointer;
  white-space: nowrap;
  user-select: none;
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

  ${({shape, type, theme}) => {
    switch (shape) {
      case 'circle': {
        if (type !== 'primary') {
          return css`
            border-radius: 50%;
            border: 1px solid ${theme.colors.primary};
          `;
        }
        return css`
          border-radius: 50%;
        `;
      }
      default:
        return css`
          border-radius: 5px;
        `;
    }
  }}

  ${({type, theme, disabledDefaultHover}) => {
    switch (type) {
      case 'primary':
        return css`
          color: #fff;
          background-color: ${theme.colors.primary};
          border: 1px solid transparent;
          text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
          box-shadow: 0 2px #0000000b;

          ${!disabledDefaultHover && brighterHover}
        `;
      case 'link':
        return css`
          color: ${theme.colors.link};
          border: 1px solid transparent;

          ${!disabledDefaultHover && brighterHover}
        `;
      default:
        return css`
          ${'' /* border-color: ${theme.colors.secondary}; */}
          color: ${theme.colors.primary};
          transition: color 0.2s ease-out, border-color 0.2s ease-out;

          ${!disabledDefaultHover && brighterHover}
        `;
    }
  }}
`;

export const Dot = styled.span`
  --size: 4px;
  display: inline-block;
  ${circle({w: 'var(--size)'})};
  background-color: ${({theme}) => theme.colors.secondary};
`;

export const CircleImgWrapper = styled.div`
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

export const Input = styled.input.attrs(() => ({
  type: 'text',
}))`
  padding: 0 50px;
  font-size: 1.8rem;
  font-weight: 400;
  background: #f8fbff;
  box-shadow: inset 0px 4px 40px rgba(175, 193, 217, 0.12);
  border-radius: 8px;

  ${({theme}) => css`
    color: ${theme.colors.blueAlphaAction};

    &:focus {
      outline: 1px solid ${theme.colors.blueAlphaAction};
    }
  `};
`;

export const FakeCheckbox = styled.input.attrs(() => ({
  type: 'checkbox',
}))`
  display: none;
`;

export const MenuItem = styled.li`
  font-size: 1.4rem;

  &:hover {
    background-color: #fafafa;
  }
`;
