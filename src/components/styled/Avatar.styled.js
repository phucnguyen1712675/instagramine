import styled, {css} from 'styled-components';
import {CircleImg} from './Lib';

const hasStoryBackground = `
  background: linear-gradient(45deg, gold, fuchsia);
`;

const hasStoryBeenSeenBackground = css`
  background: ${({theme}) => theme.colors.borderSeenStory};
`;

export const StyledAvatar = styled(CircleImg)`
  --padding-space: 2px;
	padding: var(--padding-space);
	cursor: pointer;
	user-select: none;
  ${({hasStory, hasStoryBeenSeen}) =>
    hasStory &&
    (hasStoryBeenSeen ? hasStoryBeenSeenBackground : hasStoryBackground)};
`;

export const AvatarImg = styled.img`
  padding: var(--padding-space);
`;
