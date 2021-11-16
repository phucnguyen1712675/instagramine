import styled, {css} from 'styled-components';
import {HoverScaleButton} from './Lib';

export const NavigationButton = styled(HoverScaleButton).attrs(() => ({
  fontSize: '3rem',
}))`
  ${({isActive}) =>
    isActive &&
    css`
      position: relative;

      &:after {
        --size-dot: 5px;
        content: '';
        width: var(--size-dot);
        height: var(--size-dot);
        border-radius: 100rem;
        background-color: #f31c3f;
        position: absolute;
        top: calc(100% + 5px);
      }
    `}
`;
