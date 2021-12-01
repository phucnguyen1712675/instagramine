import styled, {css} from 'styled-components';
import {PostActionButton} from './Post.styled';

export const StyledSavedButton = styled(PostActionButton)`
  ${({isSaved}) =>
    isSaved &&
    css`
      --amount: 2.4;
      color: ${({theme}) => theme.colors.primary};
    `}
`;
