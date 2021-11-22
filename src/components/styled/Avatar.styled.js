import styled, {css} from 'styled-components';
import {CircleImg} from './Lib';

const HasStoryBackground = css`
  background: linear-gradient(45deg, gold, fuchsia);
`;

const HasStoryBeenSeenBackground = css`
  background: ${({theme}) => theme.colors.borderSeenStory};
`;

export const StyledAvatar = styled(CircleImg).attrs(() => ({
  paddingSpace: '2px',
}))`
  padding: ${({paddingSpace}) => paddingSpace};
  ${({hasStory, hasStoryBeenSeen}) =>
    hasStory &&
    (hasStoryBeenSeen ? HasStoryBeenSeenBackground : HasStoryBackground)};
  cursor: pointer;
	user-select: none;

  img {
    padding: ${({paddingSpace}) => paddingSpace};
  }
`;
