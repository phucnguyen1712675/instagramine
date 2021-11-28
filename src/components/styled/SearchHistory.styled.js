import styled from 'styled-components';
import {Button} from './Lib';
import {textStyle, hideScrollBarScrolling} from './Mixins';
import {SearchInput} from './SearchBar.styled';

const centerFlex = `
	justify-content: center;
	align-items: center;
`;

export const StyledSearchHistory = styled.div`
  --width-search-history-diff: 75px;
  flex-direction: column;
  ${({isLoading}) => isLoading && centerFlex}
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

  ${SearchInput}:focus ~ & {
    display: flex;
  }
`;

export const NoResultsText = styled.p`
  text-align: center;
  ${({theme}) =>
    textStyle({
      color: theme.colors.secondary,
      fontWeight: 400,
    })};
`;

export const SearchHistoryHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 16px 8px;
`;

export const SearchHistoryHeaderTitle = styled.h3`
  display: inline-block;
  ${textStyle({
    fontSize: '1.6rem',
    fontWeight: 600,
  })};
`;

export const ClearAllButton = styled(Button)`
  display: inline-flex;
  ${({theme}) =>
    textStyle({
      color: theme.colors.link,
      fontWeight: 600,
    })};
`;

export const SearchHistoryList = styled.ul`
  display: flex;
  flex-direction: column;
`;
