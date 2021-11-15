import styled, {css} from 'styled-components';
import {Button} from './Lib';

const ActiveDot = css`
  --size-dot: 5px;
  content: '';
  width: var(--size-dot);
  height: var(--size-dot);
  border-radius: 100rem;
  background-color: #f31c3f;
  position: absolute;
  top: calc(100% + 5px);
`;

export const NavigationButton = styled(Button)`
  ${({isActive}) =>
    isActive &&
    `position: relative;
			&:after {
				${ActiveDot}
			}
		`}
`;
