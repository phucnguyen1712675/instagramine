import {useReducer, useRef, useCallback, useEffect} from 'react';
// eslint-disable-next-line no-unused-vars
import {collection, getDocs} from 'firebase/firestore';
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
import {db} from '../firebase-config';
import {
  useEventListener,
  useForm,
  useLocalStorage,
  useMounted,
  useAuth,
  useFirestoreQuery,
} from '../hooks';
import {searchBarReducer} from '../reducers';
import {
  SET_IS_OPEN,
  SET_IS_LOADING,
  SET_FILTERED_USERS,
  OPEN_FIRST_TIME,
} from '../actions/searchBarActions';

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

const SearchBar = () => {
  const [state, dispatch] = useReducer(searchBarReducer, {
    hasOpened: false,
    isOpen: false,
    isLoading: true,
    filteredUsers: [],
  });

  const [searchHistory, setSearchHistory] = useLocalStorage({
    key: 'searchHistory',
    initialValue: null,
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
    },
  });

  const inputRef = useRef(null);

  const searchHistoryFakeCheckboxRef = useRef(null);

  // eslint-disable-next-line no-unused-vars
  const auth = useAuth();

  const mounted = useMounted();

  const {
    data: users,
    status,
    error,
  } = useFirestoreQuery({
    query: collection(db, 'users'),
  });

  useEffect(() => {
    if (status !== 'loading' && status === 'error') {
      alert(error.message);
    }
  }, [status, error]);

  useEffect(() => {
    if (values.query) {
      const filteredUsers = users.filter((user) => {
        const username = user.username.toLowerCase();
        return username.includes(values.query);
      });

      dispatch({type: SET_FILTERED_USERS, payload: filteredUsers});
    }
  }, [values.query, users]);

  const onSearch = useCallback(() => {
    if (!values.query) {
      inputRef.current.blur();
      dispatch({type: SET_IS_OPEN, isOpen: false});
    }
  }, [values.query]);

  useEventListener({
    eventName: 'search',
    handler: onSearch,
    element: inputRef.current,
  });

  const resizeHandler = useCallback(() => {
    if (state.isOpen) {
      dispatch({type: SET_IS_OPEN, isOpen: false});
    }
  }, [state.isOpen]);

  useEventListener({
    eventName: 'resize',
    handler: resizeHandler,
  });

  const showHeader = !values.query && !state.isLoading;

  const searchItemArr = values.query ? state.filteredUsers : searchHistory;

  const hasItems = searchItemArr?.length > 0;

  const shouldCenterChild = state.isLoading || !hasItems;

  const hasSearchHistory = () => searchHistory?.length > 0;

  const clearAllHandler = () => {
    setSearchHistory(null);
  };

  const isOpenHandler = (e) => {
    dispatch({type: SET_IS_OPEN, payload: e.target.checked});
  };

  const focusInputHandler = () => {
    searchHistoryFakeCheckboxRef.current.checked = true;

    if (state.hasOpened) {
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

    if (hasSearchHistory()) {
      const foundIndex = searchHistory.findIndex((u) => u.id === user.id);

      if (foundIndex !== -1) {
        // Not the first item
        if (foundIndex !== 0) {
          if (mounted.current) {
            setSearchHistory((prevState) => move(prevState, foundIndex, 0));
          }
        }
      } else if (values.query) {
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

        if (mounted.current) {
          // Add new item to the beginning of the array
          setSearchHistory((prevState) => [newSearchItem, ...prevState]);
        }
      }
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
        value={values.query}
        onChange={handleChange}
        onFocus={focusInputHandler}
      />
      <SearchBarInputSearchIcon />
      <FakeCheckbox
        ref={searchHistoryFakeCheckboxRef}
        id="checkbox_search_history"
        value={state.isOpen}
        onChange={isOpenHandler}
      />
      <OverlayLabel htmlFor="checkbox_search_history" />
      {state.isOpen && (
        <SearchHistory $shouldCenterChild={shouldCenterChild}>
          {state.isLoading && status === 'loading' ? (
            <SearchHistorySpinner />
          ) : !hasItems ? (
            <NoResultsText>
              {values.query ? 'No results found.' : 'No recent searches.'}
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
                          !values.query ? (
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
