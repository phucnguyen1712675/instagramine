import styled, {css} from 'styled-components';
import {HoverScaleButton} from './Lib';
import {circle} from './Mixins';

const ActiveNavigationButton = css`
  position: relative;

  &:after {
    --size-dot: 5px;
    content: '';
    ${circle({w: 'var(--size-dot)'})};
    background-color: #f31c3f;
    position: absolute;
    top: calc(100% + 5px);
  }
`;

export const NavigationButton = styled(HoverScaleButton)`
  font-size: 3rem;
  ${({isActive}) => isActive && ActiveNavigationButton}
`;
