import styled from 'styled-components';
import {Dot, MenuItem} from './Lib';
import {TextContent} from './UserCard.styled';
import Avatar from '../Avatar';
import Button from '../Button';
import UserCard from '../UserCard';
import MultiplyIcon from '../icons/MultiplyIcon';

export const StyledSearchItemList = styled.ul`
  display: flex;
  flex-direction: column;
`;
export const SearchHistoryItem = styled(MenuItem)``;

export const SearchHistoryItemLink = styled.a`
  display: block;
`;

export const SearchHistoryItemContent = styled(UserCard)`
  padding: 8px 16px;
  cursor: pointer;

  ${TextContent} {
    --margin-left-info-content: 12px;
  }
`;

export const SearchHistoryItemAvatar = styled(Avatar)`
  --size: 5.2rem;
`;

export const SearchHistoryUserAdditionalInfo = styled.p`
  font-size: 1.2rem;
`;

export const RemoveItemButton = styled(Button)`
  padding: 8px;
`;

export const RemoveHistoryItemButtonIcon = styled(MultiplyIcon)`
  color: ${({theme}) => theme.colors.secondary};
`;

export const SearchHistoryUserAdditionalInfoDot = styled(Dot)`
  margin: 0 5px;
  transform: translateY(-50%);
`;
