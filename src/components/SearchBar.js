import {useReducer, useRef, useCallback, useEffect} from 'react';
import {
  collection,
  getDocs,
  query,
  setDoc,
  where,
  doc,
  FieldValue,
  deleteDoc,
} from 'firebase/firestore';
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
  SET_FILTERED_USERS_AFTER_FETCHING,
  OPEN_FIRST_TIME,
} from '../actions/searchBarActions';
import {getCollectionData} from '../utils/firestore';

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

const userConverter = (user) => {
  return {
    id: user.id,
    username: user.username,
    name: user.name,
    avatar: user.avatar,
    profile: user.profile,
    hasStory: user.hasStory,
    hasStoryBeenSeen: user.hasStoryBeenSeen,
    isFollowing: user.isFollowing,
    createdAt: user.createdAt,
  };
};

const SearchBar = () => {
  const [state, dispatch] = useReducer(searchBarReducer, {
    hasOpened: false,
    isOpen: false,
    isLoading: false,
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
    if (status === 'error') {
      alert(error.message);
    }
  }, [status, error]);

  const getUserSearchHistory = useCallback(async () => {
    try {
      const searchHistorySnapshot = await getDocs(
        collection(db, `users/${auth.currentUser.id}/search-history`)
      );

      return getCollectionData(searchHistorySnapshot.docs);
    } catch (error) {
      alert(`Error fetching search history: ${error}`);
    }
  }, [auth.currentUser.id]);

  useEffect(() => {
    const getSearchHistory = async () => {
      dispatch({type: SET_IS_LOADING, payload: true});

      const searchHistoryData = await getUserSearchHistory();

      if (mounted.current) {
        if (searchHistoryData.length > 0) {
          setSearchHistory(searchHistoryData);
        }
        dispatch({type: SET_IS_LOADING, payload: false});
      }
    };

    if (state.hasOpened) {
      getSearchHistory();
    }
  }, [state.hasOpened, mounted, setSearchHistory, getUserSearchHistory]);

  useEffect(() => {
    const getFilteredUsers = async () => {
      const filteredUsers = users
        .filter((user) => {
          const username = user.username.toLowerCase();
          return username.includes(values.query);
        })
        .slice(0, 10);

      dispatch({type: SET_IS_LOADING, payload: true});

      const userFollowingUserJunctions = await getDocs(
        query(
          collection(db, 'junction_user_following_user'),
          where('uid', '==', auth.currentUser.id)
        )
      );

      let filteredUsersToShow = null;

      if (userFollowingUserJunctions.docs > 0) {
        const followingUserJunctions = getCollectionData(
          userFollowingUserJunctions.docs
        );

        const followingUserIds = followingUserJunctions.map(
          (junction) => junction.followingUserId
        );

        filteredUsersToShow = filteredUsers.map((user) => {
          const convertedUser = userConverter(user);

          return {
            ...convertedUser,
            isFollowing: followingUserIds.includes(user.id),
          };
        });
      } else {
        filteredUsersToShow = filteredUsers.map((user) => {
          const convertedUser = userConverter(user);

          return {
            ...convertedUser,
            isFollowing: false,
          };
        });
      }

      if (mounted.current) {
        dispatch({
          type: SET_FILTERED_USERS_AFTER_FETCHING,
          payload: filteredUsersToShow,
        });
      }
    };

    if (values.query) {
      getFilteredUsers();
    }
  }, [values.query, users, auth.currentUser.id, mounted]);

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

  const showHeader = !values.query && !state.isLoading && status !== 'loading';

  const searchItemArr = values.query ? state.filteredUsers : searchHistory;

  const hasItems = searchItemArr?.length > 0;

  const shouldCenterChild =
    state.isLoading || status === 'loading' || !hasItems;

  const hasSearchHistory = () => searchHistory?.length > 0;

  const clearAllHandler = async () => {
    const searchHistoryData = await getUserSearchHistory();

    await Promise.all(
      searchHistoryData.forEach((item) => {
        deleteDoc(
          doc(db, `users/${auth.currentUser.id}/search-history/${item.id}`)
        );
      })
    );

    if (mounted.current) {
      setSearchHistory(null);
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

  const clickItemHandler = (e, user) => {
    e.preventDefault();

    const hasHistory = hasSearchHistory();

    const unshiftUser = async (user) => {
      try {
        dispatch({type: SET_IS_LOADING, payload: true});

        const newSearchItem = userConverter(user);

        const itemToAdd = {
          ...newSearchItem,
          createdAt: FieldValue.serverTimestamp(),
        };

        await setDoc(
          doc(
            db,
            `users/${auth.currentUser.id}/search-history/${newSearchItem.id}`
          ),
          itemToAdd
        );

        if (mounted.current) {
          setSearchHistory((prevState) => {
            if (!prevState) {
              return [newSearchItem];
            } else {
              return [newSearchItem, ...prevState];
            }
          });
          dispatch({type: SET_IS_LOADING, payload: false});
        }
      } catch (error) {
        if (mounted.current) {
          dispatch({type: SET_IS_LOADING, payload: false});
        }

        alert(`Error adding user to search history: ${error}`);
      }
    };

    if (hasHistory && values.query) {
      const foundIndex = searchHistory.findIndex((u) => u.id === user.id);

      // Not the first item
      if (![-1, 0].includes(foundIndex)) {
        setSearchHistory((prevState) => move(prevState, foundIndex, 0));
      } else {
        unshiftUser(user);
      }
    } else if (values.query) {
      unshiftUser(user);
    }
    // Clear the query
    reset();
  };

  const removeItemHandler = async (id) => {
    try {
      dispatch({type: SET_IS_LOADING, payload: true});

      await deleteDoc(
        doc(db, `users/${auth.currentUser.id}/search-history/${id}`)
      );

      if (mounted.current) {
        setSearchHistory((prevState) =>
          prevState.filter((user) => user.id !== id)
        );

        dispatch({type: SET_IS_LOADING, payload: false});
      }
    } catch (error) {
      if (mounted.current) {
        dispatch({type: SET_IS_LOADING, payload: false});
      }

      alert(`Error removing user from search history: ${error}`);
    }
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
          {state.isLoading || status === 'loading' ? (
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
