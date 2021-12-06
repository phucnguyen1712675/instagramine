import styled, {css} from 'styled-components';
import {Button} from './Lib';
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

export const NavigationButton = styled(Button).attrs(() => ({
  type: 'icon',
}))`
  color: unset;
  border-radius: unset;
	overflow: unset;
  padding: 0;
  font-size: 3rem;
  ${({isActive}) => isActive && ActiveNavigationButton}
`;
