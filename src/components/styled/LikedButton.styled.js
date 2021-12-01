import styled from 'styled-components';
import {PostActionButton} from './Post.styled';

export const StyledLikedButton = styled(PostActionButton)`
  ${({isLiked}) =>
    isLiked &&
    `
			--amount: 1.2;
  		color: #f0304e;
		`}
`;
