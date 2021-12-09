import styled, {css} from 'styled-components';
import {PostActionButton} from './Post.styled';

export const StyledSavedButton = styled(PostActionButton)`
  ${({$isSaved}) =>
    $isSaved &&
    css`
      color: ${({theme}) => theme.colors.primary};

      &:hover {
        --amount: 2.4;
      }
    `}
`;
