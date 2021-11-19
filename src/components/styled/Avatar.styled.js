import styled, {css} from 'styled-components';
import {CircleImg} from './Lib';

const HasStoryBackground = css`
  background: linear-gradient(45deg, gold, fuchsia);
`;

const HasStoryBeenSeenBackground = css`
  background: ${({theme}) => theme.colors.borderSeenStory};
`;

export const StyledAvatar = styled(CircleImg)`
  --padding-space: 2px;
  padding: var(--padding-space);
  ${({hasStory, hasStoryBeenSeen}) =>
    hasStory &&
    (hasStoryBeenSeen ? HasStoryBeenSeenBackground : HasStoryBackground)};

  img {
    padding: var(--padding-space);
  }
`;
