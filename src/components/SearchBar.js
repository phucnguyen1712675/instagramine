import {useReducer, useRef, useCallback, useEffect} from 'react';
import HideLabel from './HideLabel';
import {FakeCheckbox} from './styled/Lib';
import {
  StyledSearchBar,
  SearchBarInput,
  SearchBarSearchLabel,
  SearchBarInputSearchIcon,
  SearchHistoryOverlayLabel,
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
import {
  useEventListener,
  useForm,
  useAuth,
  useFirestoreQuery,
  useMounted,
} from '../hooks';
import {searchBarReducer} from '../reducers';
import {searchHistoryItemConverter} from '../converters';
import {
  SET_IS_OPEN,
  SET_IS_LOADING,
  SET_SEARCH_HISTORY_AFTER_LOADING,
  SET_SEARCH_HISTORY_AFTER_ADDING,
  SET_SEARCH_HISTORY_AFTER_REMOVING,
  SET_SEARCH_HISTORY_AFTER_REMOVING_ALL,
  SET_FILTERED_USERS,
  OPEN_FIRST_TIME,
} from '../actions/searchBarActions';
import {
  usersColRef,
  junctionUserFollowingUserQuery,
  getSearchHistoryByUid,
  addJunctionUserSearchHistory,
  removeJunctionUserSearchHistory,
  removeAllJunctionUserSearchHistoryByUid,
} from '../services/firestore';

const SearchBar = () => {
  const [state, dispatch] = useReducer(searchBarReducer, {
    hasOpened: false,
    isOpen: false,
    isLoading: false,
    searchHistory: [],
    filteredUsers: [],
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

  const auth = useAuth();

  const mounted = useMounted();

  const {
    data: users,
    status: usersStatus,
    error: usersError,
  } = useFirestoreQuery({
    query: usersColRef.withConverter(searchHistoryItemConverter),
  });

  const {
    data: followingUserIds,
    status: followingUserIdsStatus,
    error: followingUserIdsError,
  } = useFirestoreQuery({
    query: junctionUserFollowingUserQuery(auth.authUser.id),
  });

  useEffect(() => {
    if (state.hasOpened) {
      const getSearchHistory = async () => {
        dispatch({type: SET_IS_LOADING, payload: true});

        const searchHistoryData = await getSearchHistoryByUid(auth.authUser.id);

        if (mounted.current) {
          dispatch({
            type: SET_SEARCH_HISTORY_AFTER_LOADING,
            payload: searchHistoryData,
          });
        }
      };

      getSearchHistory();
    }
  }, [state.hasOpened, auth.authUser.id, mounted]);

  useEffect(() => {
    if (values.query) {
      const usersFiltered = users
        .filter((user) => {
          const username = user.username.toLowerCase();
          return username.includes(values.query);
        })
        .map((user) => ({
          ...user,
          isFollowing: followingUserIds.includes(user.id),
        }))
        .slice(0, 10);

      dispatch({
        type: SET_FILTERED_USERS,
        payload: usersFiltered,
      });
    }
  }, [followingUserIds, users, values.query]);

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
      searchHistoryFakeCheckboxRef.current.checked = false;
      inputRef.current.blur();
      dispatch({type: SET_IS_OPEN, isOpen: false});
    }
  }, [state.isOpen]);

  useEventListener({
    eventName: 'resize',
    handler: resizeHandler,
  });

  const shouldLoading =
    state.isLoading ||
    usersStatus === 'loading' ||
    followingUserIdsStatus === 'loading';

  const showHeader = !values.query && !shouldLoading;

  const searchItemArr = values.query
    ? state.filteredUsers
    : state.searchHistory;

  const hasItems = searchItemArr?.length > 0;

  const shouldCenterChild = shouldLoading || !hasItems;

  const clearAllHandler = async () => {
    dispatch({type: SET_IS_LOADING, payload: true});

    await removeAllJunctionUserSearchHistoryByUid(auth.authUser.id);

    if (mounted.current) {
      dispatch({type: SET_SEARCH_HISTORY_AFTER_REMOVING_ALL});
    }
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
    }
  };

  const clickItemHandler = async (e, user) => {
    e.preventDefault();

    dispatch({type: SET_IS_LOADING, payload: true});

    await addJunctionUserSearchHistory({
      uid: auth.authUser.id,
      searchUser: user,
    });

    if (mounted.current) {
      dispatch({
        type: SET_SEARCH_HISTORY_AFTER_ADDING,
        payload: user,
      });
    }

    reset();
  };

  const removeItemHandler = async (userId) => {
    dispatch({type: SET_IS_LOADING, payload: true});

    await removeJunctionUserSearchHistory({
      uid: auth.authUser.id,
      searchUserId: userId,
    });

    if (mounted.current) {
      dispatch({
        type: SET_SEARCH_HISTORY_AFTER_REMOVING,
        payload: userId,
      });
    }
  };

  if (shouldLoading) {
    return <p>Loading...</p>;
  }

  if (usersError === 'error') {
    return <p>{`Error: ${usersError.message}`}</p>;
  }

  if (followingUserIdsError === 'error') {
    return <p>{`Error: ${followingUserIdsError.message}`}</p>;
  }

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
      <SearchBarSearchLabel htmlFor="search_input">
        <SearchBarInputSearchIcon />
      </SearchBarSearchLabel>
      <FakeCheckbox
        ref={searchHistoryFakeCheckboxRef}
        id="checkbox_search_history"
        value={state.isOpen}
        onChange={isOpenHandler}
      />
      <SearchHistoryOverlayLabel htmlFor="checkbox_search_history" />
      {state.isOpen && (
        <SearchHistory $shouldCenterChild={shouldCenterChild}>
          {shouldLoading ? (
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
                            {user.isFollowing && (
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
                              onClick={() => removeItemHandler(user.id)}
                              disabledHover
                            >
                              -<RemoveHistoryItemButtonIcon />
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
