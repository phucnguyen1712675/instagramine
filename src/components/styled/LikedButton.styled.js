import styled, {css} from 'styled-components';
import {PostActionButton} from './PostActions.styled';

const likedColor = css`
  color: #f0304e;
`;

export const StyledLikedButton = styled(PostActionButton).attrs(
  ({isLiked}) => ({
    amount: isLiked ? 1.2 : 0.8,
  })
)`
  ${({isLiked}) => isLiked && likedColor}
`;
