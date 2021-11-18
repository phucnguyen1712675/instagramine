import styled, {css} from 'styled-components';
import {HoverScaleButton} from './Lib';
import {sizeCircle} from './Mixins';

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
        ${sizeCircle({size: 'var(--size-dot)'})}
        background-color: #f31c3f;
        position: absolute;
        top: calc(100% + 5px);
      }
    `}
`;
