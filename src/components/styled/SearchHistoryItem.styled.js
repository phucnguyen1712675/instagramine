import styled from 'styled-components';
import {Button, Dot} from './Lib';
import {StyledAvatar} from './Avatar.styled';
import UserCard from '../UserCard';

export const StyledSearchHistoryItem = styled.li`
  &:hover {
    background-color: rgba(250, 250, 250, 1);
  }

  a {
    display: block;
  }
`;

export const SearchHistoryItemContent = styled(UserCard)`
  padding: 8px 16px;

  ${StyledAvatar} {
    margin-right: 12px;
  }

  ${Button} {
    svg {
      color: ${({theme}) => theme.colors.secondary};
    }
  }
`;

export const SearchHistoryUserAdditionalInfo = styled.p`
  font-size: 1.2rem;

  ${Dot} {
    margin: 0 5px;
    transform: translateY(-50%);
  }
`;
