import styled from 'styled-components';
import {textStyle, flexCenter, flexColumn} from './Mixins';
import {Button} from './Lib';
import {StyledAvatar} from './Avatar.styled';

export const StyledSearchHistoryItem = styled.li`
  padding: 8px 16px;
  cursor: pointer;

  &:hover {
    background-color: rgba(250, 250, 250, 1);
  }

  a {
    display: flex;
  }

  ${StyledAvatar} {
    margin-right: 12px;
  }

  ${Button} {
    align-self: center;
    font-size: 1.6rem;
    padding: 8px;

    svg {
      color: ${({theme}) => theme.colors.secondary};
    }
  }
`;

export const SearchHistoryContentWrapper = styled.div`
  ${flexCenter({horizontally: false})};
  flex-grow: 1;
`;

export const SearchHistoryContent = styled.div`
  ${flexColumn}
  font-size: 1.4rem;
  line-height: 1.4;

  h4 {
    ${({theme}) => textStyle({color: theme.colors.primary, fontWeight: 600})};
  }

  div {
    ${flexCenter({horizontally: false})};
    ${({theme}) => textStyle({color: theme.colors.secondary})};
  }
`;

export const Dot = styled.span`
  --size-dot: 4px;
  width: var(--size-dot);
  height: var(--size-dot);
  border-radius: 100rem;
  background-color: ${({theme}) => theme.colors.secondary};
  margin: 0 5px;
`;
