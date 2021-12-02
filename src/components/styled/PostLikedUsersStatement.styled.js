import styled from 'styled-components';
import {hoverUnderline, textStyle} from './Mixins';

export const StyledPostLikedUsersStatement = styled.p`
  ${textStyle({
    fontSize: '1.2rem',
    fontWeight: 400,
  })};
`;

export const PostLikedUsersHighlight = styled.a`
  font-weight: 800;
  ${hoverUnderline}
`;
