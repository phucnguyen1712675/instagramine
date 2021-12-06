import styled from 'styled-components';
import {PostActionButton} from './Post.styled';

export const StyledLikedButton = styled(PostActionButton)`
  ${({isLiked}) =>
    isLiked &&
    `
  		color: #f0304e;

			&:hover {
				--amount: 1.2;
			}
		`}
`;
