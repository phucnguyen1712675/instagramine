import styled, {css} from 'styled-components';
import {PostActionButton} from './Post.styled';

export const StyledLikedButton = styled(PostActionButton)`
  ${({$isLiked, theme}) =>
    $isLiked &&
    css`
      color: ${theme.colors.likedButton};

      &:hover {
        --amount: 1.2;
      }
    `}
`;
