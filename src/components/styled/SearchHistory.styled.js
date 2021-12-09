import styled from 'styled-components';
import {hideScrollBarScrolling} from './Mixins';
import {SearchInput} from './SearchBar.styled';
import Button from '../Button';

const flexCenter = `
	justify-content: center;
	align-items: center;
`;

export const StyledSearchHistory = styled.div`
  --width-search-history-diff: 75px;
  ${({$isLoading}) => $isLoading && flexCenter}
  position: absolute;
  top: calc(100% + 14px);
  width: calc(var(--width-search-bar) + var(--width-search-history-diff));
  height: 362px;
  left: calc(-1 * var(--width-search-history-diff) / 2);
  background-color: ${({theme}) => theme.colors.bgComponentLightTheme};
  z-index: 1;
  border-radius: 6px;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.0975);
  overflow-y: auto;
  ${hideScrollBarScrolling}
  display: none;
  flex-direction: column;
	
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

export const SearchHistoryList = styled.ul`
  display: flex;
  flex-direction: column;
`;
