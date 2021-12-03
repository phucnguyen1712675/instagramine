import styled from 'styled-components';
import {Dot} from './Lib';
import Avatar from '../Avatar';
import UserCard from '../UserCard';
import MultiplyIcon from '../icons/MultiplyIcon';

export const StyledSearchHistoryItem = styled.li`
  &:hover {
    background-color: ${({theme}) => theme.colors.menuItemHover};
  }
`;

export const SearchHistoryItemLink = styled.a`
  display: block;
`;

export const SearchHistoryItemContent = styled(UserCard)`
  --margin-left-info-content: 12px;
  padding: 8px 16px;
`;

export const RemoveHistoryItemButtonIcon = styled(MultiplyIcon)`
  color: ${({theme}) => theme.colors.secondary};
`;

export const SearchHistoryItemAvatar = styled(Avatar)`
  --size: 5.2rem;
`;

export const SearchHistoryUserAdditionalInfo = styled.p`
  font-size: 1.2rem;
`;

export const SearchHistoryUserAdditionalInfoDot = styled(Dot)`
  margin: 0 5px;
  transform: translateY(-50%);
`;
