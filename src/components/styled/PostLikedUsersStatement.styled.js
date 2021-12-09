import styled from 'styled-components';
import {hoverUnderline} from './Mixins';

export const StyledPostLikedUsersStatement = styled.p`
	font-size: 1.2rem;
	font-weight: 400;
`;

export const PostLikedUsersHighlight = styled.a`
  font-weight: 800;
  ${hoverUnderline}
`;
