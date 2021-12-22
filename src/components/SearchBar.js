import {useReducer, useRef, useCallback, useEffect} from 'react';
import HideLabel from './HideLabel';
import {FakeCheckbox, OverlayLabel} from './styled/Lib';
import {
  StyledSearchBar,
  SearchBarInput,
  SearchBarInputSearchIcon,
  SearchHistory,
  SearchHistoryInner,
  SearchHistorySpinner,
  SearchHistoryHeader,
  SearchHistoryHeaderTitle,
  ClearAllButton,
  SearchItemList,
  SearchHistoryItem,
  SearchHistoryItemLink,
  SearchHistoryItemContent,
  SearchHistoryItemAvatar,
  SearchHistoryUserAdditionalInfo,
  SearchHistoryUsernameText,
  SearchHistoryFollowingText,
  RemoveItemButton,
  RemoveHistoryItemButtonIcon,
  SearchHistoryUserAdditionalInfoDot,
  NoResultsText,
} from './styled/SearchBar.styled';
import {useEventListener} from '../hooks/useEventListener';
import {useForm} from '../hooks/useForm';
import {useLocalStorage} from '../hooks/useLocalStorage';
import SearchBarReducer from '../reducers/search-bar-reducer';
import {
  SET_IS_OPEN,
  SET_IS_LOADING,
  OPEN_FIRST_TIME,
  FILTER_USERS,
} from '../actions/search-bar-actions';

const SearchBar = () => {
  const [state, dispatch] = useReducer(SearchBarReducer, {
    hasOpened: false,
    isOpen: false,
    isLoading: true,
    filteredUsers: [],
  });

  const [searchHistory, setSearchHistory] = useLocalStorage({
    key: 'searchHistory',
    initialValue: [],
  });

  const {values, handleChange, handleSubmit, reset} = useForm({
    initialValues: {
      query: '',
    },
    validate: (values) => {
      const errors = {};

      if (values.query) {
        errors.query = 'Please enter a search query';
      }

      return errors;
    }
  });

  const {query} = values;

  const {hasOpened, isOpen, isLoading, filteredUsers} = state;

  const inputRef = useRef(null);

  const searchHistoryFakeCheckboxRef = useRef(null);

  useEffect(() => {
    if (query) {
      dispatch({type: FILTER_USERS, payload: query});

      setTimeout(() => {
        dispatch({type: SET_IS_LOADING, payload: false});
      }, 1000);
    }
  }, [query]);

  const onSearch = useCallback(() => {
    if (!query) {
      inputRef.current.blur();
      dispatch({type: SET_IS_OPEN, isOpen: false});
    }
  }, [query]);

  useEventListener({
    eventName: 'search',
    handler: onSearch,
    element: inputRef.current,
  });

  const resizeHandler = useCallback(() => {
    if (isOpen) {
      dispatch({type: SET_IS_OPEN, isOpen: false});
    }
  }, [isOpen]);

  useEventListener({
    eventName: 'resize',
    handler: resizeHandler,
  });

  const showHeader = !query && !isLoading;

  const searchItemArr = query ? filteredUsers : searchHistory;

  const hasItems = searchItemArr.length > 0;

  const shouldCenterChild = isLoading || !hasItems;

  const clearAllHandler = () => {
    setSearchHistory([]);
  };

  const isOpenHandler = (e) => {
    dispatch({type: SET_IS_OPEN, payload: e.target.checked});
  };

  const focusInputHandler = () => {
    searchHistoryFakeCheckboxRef.current.checked = true;

    if (hasOpened) {
      dispatch({type: SET_IS_OPEN, payload: true});
    } else {
      dispatch({type: OPEN_FIRST_TIME});

      setTimeout(() => {
        dispatch({type: SET_IS_LOADING, payload: false});
      }, 1000);
    }
  };

  const clickItemHandler = (e, user) => {
    e.preventDefault();
    const foundIndex = searchHistory.findIndex((u) => u.id === user.id);

    if (foundIndex !== -1) {
      // Not the first item
      if (foundIndex !== 0) {
        const move = (array, from, to) => {
          if (to === from) return array;

          var target = array[from];
          var increment = to < from ? -1 : 1;

          for (var k = from; k != to; k += increment) {
            array[k] = array[k + increment];
          }

          array[to] = target;

          return array;
        };
        setSearchHistory((prevState) => move(prevState, foundIndex, 0));
      }
    } else if (query) {
      const newSearchItem = {
        id: user.id,
        username: user.username,
        name: user.name,
        avatar: user.avatar,
        profile: user.profile,
        isFollowed: user.isFollowed,
        hasStory: user.hasStory,
        hasStoryBeenSeen: user.hasStoryBeenSeen,
      };
      // Add new item to the beginning of the array
      setSearchHistory((prevState) => [newSearchItem, ...prevState]);
    }
    // Clear the query
    reset();
  };

  const removeItemHandler = (e, id) => {
    e.preventDefault();
    setSearchHistory((prevState) => prevState.filter((user) => user.id !== id));
  };

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
        onFocus={focusInputHandler}
      />
      <SearchBarInputSearchIcon />
      <FakeCheckbox
        ref={searchHistoryFakeCheckboxRef}
        id="checkbox_search_history"
        value={isOpen}
        onChange={isOpenHandler}
      />
      <OverlayLabel htmlFor="checkbox_search_history" />
      {isOpen && (
        <SearchHistory $shouldCenterChild={shouldCenterChild}>
          {isLoading ? (
            <SearchHistorySpinner />
          ) : !hasItems ? (
            <NoResultsText>
              {query ? 'No results found.' : 'No recent searches.'}
            </NoResultsText>
          ) : (
            <SearchHistoryInner>
              {showHeader && (
                <SearchHistoryHeader>
                  <SearchHistoryHeaderTitle>Recent</SearchHistoryHeaderTitle>
                  <ClearAllButton type="link" onMouseDown={clearAllHandler}>
                    Clear All
                  </ClearAllButton>
                </SearchHistoryHeader>
              )}
              <SearchItemList>
                {searchItemArr.map((user) => (
                  <SearchHistoryItem key={user.id}>
                    <SearchHistoryItemLink
                      href={user.profile}
                      onClick={(e) => clickItemHandler(e, user)}
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      <SearchHistoryItemContent
                        topTextAsHeading
                        avatarComponent={
                          <SearchHistoryItemAvatar
                            url={user.avatar}
                            hasStory={user.hasStory}
                            hasStoryBeenSeen={user.hasStoryBeenSeen}
                            disableOnClickHandler
                          />
                        }
                        topText={user.username}
                        bottomTextComponent={
                          <SearchHistoryUserAdditionalInfo>
                            <SearchHistoryUsernameText>
                              {user.name}
                            </SearchHistoryUsernameText>
                            {user.isFollowed && (
                              <>
                                <SearchHistoryUserAdditionalInfoDot />
                                <SearchHistoryFollowingText>
                                  Following
                                </SearchHistoryFollowingText>
                              </>
                            )}
                          </SearchHistoryUserAdditionalInfo>
                        }
                        optionComponent={
                          !query ? (
                            <RemoveItemButton
                              type="text"
                              onClick={(e) => removeItemHandler(e, user.id)}
                              disabledHover
                            >
                              <RemoveHistoryItemButtonIcon />
                            </RemoveItemButton>
                          ) : null
                        }
                      />
                    </SearchHistoryItemLink>
                  </SearchHistoryItem>
                ))}
              </SearchItemList>
            </SearchHistoryInner>
          )}
        </SearchHistory>
      )}
    </StyledSearchBar>
  );
};

export default SearchBar;
