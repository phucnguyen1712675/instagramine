import styled, {css} from 'styled-components';
import {PostActionButton} from './Post.styled';

const likedColor = css`
  color: ${({theme}) => theme.colors.primary};
`;

export const StyledSavedButton = styled(PostActionButton).attrs(
  ({isSaved}) => ({
    amount: isSaved ? 1.2 : 0.8,
  })
)`
  ${({isSaved}) => isSaved && likedColor}
`;
