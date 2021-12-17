import styled, {css} from 'styled-components';
import {wh, hideScrollBarScrolling} from './Mixins';
import {SearchInput, Dot, MenuItem} from './Lib';
import {TextContent} from './UserCard.styled';
import Button from '../Button';
import Spinner from '../Spinner';
import UserCard from '../UserCard';
import Avatar from '../Avatar';
import SearchIcon from '../icons/SearchIcon';
import MultiplyIcon from '../icons/MultiplyIcon';

export const StyledSearchBar = styled.form`
  --width-search-bar: 300px;
  position: relative;
  width: var(--width-search-bar);
  height: 48px;
`;

export const SearchBarInput = styled(SearchInput)`
  --padding-cancel-button: 25px;
  position: absolute;
  left: 0;
  ${wh}
  padding-top: 0;
  padding-right: calc(50px - var(--padding-cancel-button));
  padding-bottom: 0;
  padding-left: 50px;
  font-size: 1.8rem;
  border-radius: 8px;

  &::-webkit-search-cancel-button {
    position: relative;
    left: 9px;
    cursor: pointer;
    padding: 0.2rem;
  }
`;

export const SearchBarInputSearchIcon = styled(SearchIcon)`
  position: absolute;
  top: 0;
  left: 18px;
  height: 100%;
  z-index: 1;
  color: ${({theme}) => theme.colors.blueAlphaAction};
  font-size: 1.8rem;

  ${SearchInput}:focus ~ & {
    display: none;
  }
`;

const flexCenter = css`
  justify-content: center;
  align-items: center;
`;

export const SearchHistory = styled.div`
  --width-search-history-diff: 75px;
  position: absolute;
  top: calc(100% + 14px);
  left: calc(-1 * var(--width-search-history-diff) / 2);
  width: calc(var(--width-search-bar) + var(--width-search-history-diff));
  height: 362px;
  border-radius: 6px;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.0975);
  background-color: ${({theme}) => theme.colors.bgComponentLightTheme};
  z-index: 1;
  overflow-y: auto;
  display: none;
  flex-direction: column;
  ${hideScrollBarScrolling}
  ${({$shouldCenterChild}) => $shouldCenterChild && flexCenter}

  ${SearchInput}:focus ~ & {
    display: flex;
  }
`;

export const SearchHistorySpinner = styled(Spinner)`
  padding: 2.7rem;
`;

export const SearchHistoryHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 16px 8px;
`;

export const SearchHistoryHeaderTitle = styled.h3`
  display: inline-block;
  font-size: 1.6rem;
  font-weight: 600;
`;

export const ClearAllButton = styled(Button)`
  padding: 0;
`;

export const SearchItemList = styled.ul`
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

export const NoResultsText = styled.p`
  color: ${({theme}) => theme.colors.secondary};
  font-weight: 400;
  text-align: center;
`;
