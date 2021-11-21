import styled, {css} from 'styled-components';
import {HoverScaleButton} from './Lib';
import {sizeCircle} from './Mixins';

export const NavigationButton = styled(HoverScaleButton).attrs(() => ({
  fontSize: '3rem',
  sizeDot: '5px',
}))`
  ${({isActive}) =>
    isActive &&
    css`
      position: relative;

      &:after {
        content: '';
        ${({sizeDot}) => sizeCircle({size: sizeDot})};
        background-color: #f31c3f;
        position: absolute;
        top: calc(100% + 5px);
      }
    `}
`;
