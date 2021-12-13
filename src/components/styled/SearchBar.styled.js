import styled, {css} from 'styled-components';
import {wh, hideScrollBarScrolling} from './Mixins';
import {Input} from './Lib';
import Button from '../Button';
import SearchIcon from '../icons/SearchIcon';

export const StyledSearchBar = styled.form`
  --width-search-bar: 300px;
  position: relative;
  width: var(--width-search-bar);
  height: 48px;
`;

export const SearchInput = styled(Input).attrs(() => ({
  type: 'search',
  autoComplete: 'off',
}))`
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

export const SearchInputSearchIcon = styled(SearchIcon)`
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

export const NoResultsText = styled.p`
  color: ${({theme}) => theme.colors.secondary};
  font-weight: 400;
  text-align: center;
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
