import styled from 'styled-components';
import {hoverUnderline, textStyle} from './Mixins';

export const StyledPostLikedUsersStatement = styled.p`
  ${({theme}) =>
    textStyle({
      color: theme.colors.primary,
      fontSize: '1.2rem',
      fontWeight: 400,
    })};
`;

export const PostLikedUsersHighlight = styled.a`
  font-weight: 800;
  color: inherit;
  ${hoverUnderline}
`;
