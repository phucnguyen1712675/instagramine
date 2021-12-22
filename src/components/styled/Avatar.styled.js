import styled, {css} from 'styled-components';
import {CircleImgWrapper} from './Lib';

export const StyledAvatar = styled(CircleImgWrapper)`
  --padding-space: 2px;
  padding: var(--padding-space);
  cursor: pointer;
  user-select: none;
  ${({$hasStory, $hasStoryBeenSeen, theme}) =>
    $hasStory &&
    ($hasStoryBeenSeen
      ? css`
          background: ${theme.colors.borderSeenStory};
        `
      : css`
          background: linear-gradient(45deg, gold, fuchsia);
        `)};
`;

export const AvatarImg = styled.img`
  padding: var(--padding-space);
`;
