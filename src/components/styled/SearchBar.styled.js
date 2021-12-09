import styled from 'styled-components';
import {wh} from './Mixins';
import {Input} from './Lib';
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
  placeholder: 'Search',
}))`
  --padding-cancel-button: 25px;
  position: absolute;
  left: 0;
  ${wh}
  padding-left: 50px;
  padding-right: calc(50px - var(--padding-cancel-button));

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
