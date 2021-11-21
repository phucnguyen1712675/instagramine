import styled from 'styled-components';
import {HoverBrighterButton} from './Lib';
import {hoverUnderline} from './Mixins';
import {InfoContentUsername} from './UserCard.styled';
import UserCard from '../UserCard';

export const StyledPostHeader = styled(UserCard)`
  padding-bottom: 0;

  ${InfoContentUsername} {
    ${hoverUnderline}
  }
`;

export const PostHeaderLocation = styled.a`
  color: inherit;
`;

export const MoreOptionButton = styled(HoverBrighterButton)`
  font-size: 1.8rem;

  svg {
    color: ${({theme}) => theme.colors.blueAlphaAction};
  }
`;
