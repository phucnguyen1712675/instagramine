import styled, {css} from 'styled-components';
import {brighterHover, buttonColorHover, wh} from './Mixins';
import Spinner from '../Spinner';

const smallSize = `
  font-size: 1.4rem;
  padding: 0 7px;
`;

const largeSize = `
  font-size: 1.6rem;
  padding: 6.4px 15px;
`;

const mediumSize = `
  font-size: 1.4rem;
  padding: 4px 15px;
`;

const circleShape = `
  border-radius: 50%;
`;

const roundShape = `
  border-radius: 40px;
`;

const defaultShape = `
  border-radius: 5px;
`;

export const ButtonSpinner = styled(Spinner)`
  padding: 0;
  ${wh({w: '2.6rem'})}
`;

const primaryType = css`
  font-weight: 600;
  color: #fff;
  ${({theme}) => `
  	background-color: ${theme.colors.link};
  	border: 1px solid ${theme.colors.link};
	`}
  text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
  box-shadow: 0 2px #0000000b;

  ${({$disabledHover}) => !$disabledHover && brighterHover}

  ${ButtonSpinner} {
    --color-spinner: #fff;
  }
`;

const linkType = css`
  font-weight: 600;
  color: ${({theme}) => theme.colors.link};
  border: 1px solid transparent;

  ${({$disabledHover}) => !$disabledHover && brighterHover}
`;

const textType = css`
  color: ${({theme}) => theme.colors.primary};
  border: 1px solid transparent;

  ${({$disabledHover}) => !$disabledHover && brighterHover}
`;

const defaultType = css`
  font-weight: 600;
  ${({theme}) => `
  	color: ${theme.colors.primary};
  	border: 1px solid ${theme.colors.borderGray};
	`}

  ${({$disabledHover, $loading}) =>
    !$disabledHover && !$loading && buttonColorHover}
`;

const loadingStyle = css`
  cursor: default;
  position: relative;
  ${({$type}) => $type === 'primary' && 'border: unset;'}

  &::before {
    content: '';
    pointer-events: none;
    position: absolute;
    inset: -1px;
    z-index: 1;
    background-color: #fff;
    border-radius: inherit;
    opacity: 0.35;
    transition: opacity 0.2s ease-out;
  }
`;

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

  ${({$size}) => {
    switch ($size) {
      case 'small':
        return smallSize;
      case 'large':
        return largeSize;
      default:
        return mediumSize;
    }
  }}

	${({$shape}) => {
    switch ($shape) {
      case 'circle':
        return circleShape;
      case 'round':
        return roundShape;
      default:
        return defaultShape;
    }
  }}

  ${({$type}) => {
    switch ($type) {
      case 'primary':
        return primaryType;
      case 'link':
        return linkType;
      case 'text':
        return textType;
      default:
        return defaultType;
    }
  }}
  ${({$block}) => $block && 'width: 100%;'}

	${({$loading}) => $loading && loadingStyle}

	&:disabled,
  &[disabled] {
    pointer-events: none;

    ${({$type}) => {
    switch ($type) {
      case 'primary':
      case 'link':
      case 'text':
        return `
          border-color: transparent;
          background-color: rgba(51, 141, 246, 0.8);
        `;
      default:
        return 'color: rgba(27, 29, 40, 0.5);';
    }
  }}
  }
`;
