import styled, {css} from 'styled-components';
import {brighterHover, linkColorHover} from './Mixins';

export const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  overflow: hidden;
  cursor: pointer;
  text-transform: none;
  white-space: nowrap;
  user-select: none;
  border: none;
  outline: none;
  color: inherit;
  text-align: center;
  text-decoration: none;
  appearance: none;

  &:disabled,
  &[disabled] {
    pointer-events: none;
    color: rgba(27, 29, 40, 0.5);
  }

  ${({$block}) => $block && 'width: 100%;'}

  ${({$size}) => {
    switch ($size) {
      case 'small':
        return css`
          font-size: 1.4rem;
          padding: 0 7px;
        `;
      case 'large':
        return css`
          font-size: 1.6rem;
          padding: 6.4px 15px;
        `;
      default:
        return css`
          font-size: 1.4rem;
          padding: 4px 15px;
        `;
    }
  }}

	${({$shape}) => {
    switch ($shape) {
      case 'circle':
        return css`
          border-radius: 50%;
        `;
      case 'round':
        return css`
          border-radius: 40px;
        `;
      default:
        return css`
          border-radius: 5px;
        `;
    }
  }}

  ${({$type, theme}) => {
    switch ($type) {
      case 'primary':
        return css`
          font-weight: 600;
          color: #fff;
          background-color: ${theme.colors.link};
          border: 1px solid ${theme.colors.link};
          text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
          box-shadow: 0 2px #0000000b;
          ${({$disabledHover}) => !$disabledHover && brighterHover}
        `;
      case 'link':
        return css`
          font-weight: 600;
          color: ${theme.colors.link};
          border: 1px solid transparent;
          ${({$disabledHover}) => !$disabledHover && brighterHover}
        `;
      case 'text':
        return css`
          color: ${theme.colors.primary};
          border: 1px solid transparent;
          ${({$disabledHover}) => !$disabledHover && brighterHover}
        `;
      default:
        return css`
          font-weight: 600;
          color: ${theme.colors.primary};
          border: 1px solid ${theme.colors.borderGray};
          ${({$disabledHover}) => !$disabledHover && linkColorHover}
        `;
    }
  }}
`;
