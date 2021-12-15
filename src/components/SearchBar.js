import {useReducer, useEffect, useRef} from 'react';
import SearchItemList from './SearchItemList';
import HideLabel from './HideLabel';
import {
  StyledSearchBar,
  SearchBarInput,
  SearchBarInputSearchIcon,
  SearchHistory,
  SearchHistorySpinner,
  SearchHistoryHeader,
  SearchHistoryHeaderTitle,
  ClearAllButton,
  NoResultsText,
} from './styled/SearchBar.styled';
import SearchBarReducer from '../reducers/search-bar-reducer';
import {
  SET_HAS_OPENED,
  SET_IS_LOADING,
  SET_QUERY,
  REMOVE_ALL_USERS,
  FILTER_USERS,
} from '../actions/search-bar-actions';
import searchHistoryData from '../data/search-history.json';

const SearchBar = () => {
  const [state, dispatch] = useReducer(SearchBarReducer, {
    hasOpened: false,
    isLoading: true,
    history: searchHistoryData,
    filteredUsers: [],
    query: '',
  });

  const {hasOpened, isLoading, history, filteredUsers, query} = state;

  const inputRef = useRef(null);

  const queryRef = useRef(query);

  queryRef.current = query;

  useEffect(() => {
    inputRef?.current?.addEventListener('search', onSearch);

    return () => {
      inputRef?.current?.removeEventListener('search', onSearch);
    };
  }, []);

  const handleChange = (e) => {
    const query = e.target.value;

    if (query) {
      dispatch({type: FILTER_USERS, payload: query});

      setTimeout(() => {
        dispatch({type: SET_IS_LOADING, payload: false});
      }, 1000);
    } else {
      dispatch({type: SET_QUERY, payload: query});
    }
  };

  const onFocus = () => {
    if (hasOpened) {
      return;
    }

    dispatch({type: SET_HAS_OPENED, payload: true});

    setTimeout(() => {
      dispatch({type: SET_IS_LOADING, payload: false});
    }, 1000);
  };

  const onSearch = () => {
    if (!query) {
      inputRef.current.blur();
    }
  };

  const clearAllHandler = () => {
    dispatch({type: REMOVE_ALL_USERS});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  let searchHistoryContent;

  if (isLoading) {
    searchHistoryContent = <SearchHistorySpinner />;
  } else if (query) {
    if (filteredUsers.length > 0) {
      searchHistoryContent = (
        <SearchItemList users={filteredUsers} dispatch={dispatch} />
      );
    } else {
      searchHistoryContent = <NoResultsText>No results found.</NoResultsText>;
    }
  } else if (history.length > 0) {
    searchHistoryContent = (
      <>
        <SearchHistoryHeader>
          <SearchHistoryHeaderTitle>Recent</SearchHistoryHeaderTitle>
          <ClearAllButton type="link" onMouseDown={clearAllHandler}>
            Clear All
          </ClearAllButton>
        </SearchHistoryHeader>
        <SearchItemList users={history} hasQuery={false} dispatch={dispatch} />
      </>
    );
  } else {
    searchHistoryContent = <NoResultsText>No recent searches.</NoResultsText>;
  }

  return (
    <StyledSearchBar onSubmit={handleSubmit}>
      <HideLabel htmlFor="search_input">Search users</HideLabel>
      <SearchBarInput
        ref={inputRef}
        id="search_input"
        name="query"
        placeholder="Search"
        value={query}
        onChange={handleChange}
        onFocus={onFocus}
      />
      <SearchBarInputSearchIcon />
      <SearchHistory
        $shouldCenterChild={
          isLoading ||
          (query && filteredUsers.length <= 0) ||
          history.length <= 0
        }
      >
        {searchHistoryContent}
      </SearchHistory>
    </StyledSearchBar>
  );
};

export default SearchBar;
