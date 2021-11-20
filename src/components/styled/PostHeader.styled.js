import styled from 'styled-components';
import {Button} from './Lib';
import {InfoContentUsername} from './UserCard.styled';
import UserCard from '../UserCard';

export const StyledPostHeader = styled(UserCard)`
	padding-bottom: 0;

  ${InfoContentUsername}:hover {
    text-decoration: underline;
    text-decoration-color: ${({theme}) => theme.colors.primary};
  }
`;

export const PostHeaderLocation = styled.a`
  color: inherit;
`;

export const MoreOptionButton = styled(Button)`
  font-size: 1.8rem;

  svg {
    color: ${({theme}) => theme.colors.blueAlphaAction};
  }
`;
