import {useReducer, useRef} from 'react';
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

  const {values, handleChange, handleSubmit} = useForm({
    initialValues: {
      query: '',
    },
  });

  const {query} = values;

  const {hasOpened, isOpen, isLoading, filteredUsers} = state;

  const inputRef = useRef(null);

  const searchHistoryFakeCheckboxRef = useRef(null);

  const onSearch = () => {
    if (!query) {
      inputRef.current.blur();
    }
  };

  useEventListener({
    eventName: 'search',
    handler: onSearch,
    element: inputRef,
  });

  const showHeader = !query && !isLoading;

  const filteredUsersLength = filteredUsers.length;

  const historyLength = history.length;

  const shouldCenterChild =
    isLoading || (query && filteredUsersLength <= 0) || historyLength <= 0;

  const onQueryChange = (e) => {
    const query = e.target.value;

    if (query) {
      dispatch({type: FILTER_USERS, payload: query});

      setTimeout(() => {
        dispatch({type: SET_IS_LOADING, payload: false});
      }, 1000);
    }

    handleChange(e);
  };

  const clearAllHandler = () => {
    setSearchHistory([]);
  };

  const handleOnFakeCheckboxChange = (e) => {
    const {checked} = e.target;
    dispatch({type: SET_IS_OPEN, payload: checked});
  };

  const handleOnInputFocus = () => {
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

  const handleOnInputBlur = () => {
    // if (isOpen) {
    //   inputRef.current.focus();
    // }
  };

  const clickSearchItemHandler = (e, user) => {
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

      setSearchHistory((prevState) => [...prevState, newSearchItem]);
    }
  };

  const removeItemHandler = (e, id) => {
    e.preventDefault();

    setSearchHistory((prevState) => prevState.filter((user) => user.id !== id));
  };

  const searchItemArr = query ? filteredUsers : searchHistory;

  const searchItemArrLength = searchItemArr.length;

  let searchItemListContent = null;

  if (searchItemArrLength) {
    searchItemListContent = (
      <>
        {searchItemArr.map((user) => (
          <SearchHistoryItem key={user.id}>
            <SearchHistoryItemLink
              href={user.profile}
              onClick={(e) => clickSearchItemHandler(e, user)}
              onMouseDown={(e) => e.preventDefault()}
            >
              <SearchHistoryItemContent
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
                    <span>{user.name}</span>
                    {user.isFollowed && (
                      <>
                        <SearchHistoryUserAdditionalInfoDot />
                        <span>Following</span>
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
                topTextAsHeading
              />
            </SearchHistoryItemLink>
          </SearchHistoryItem>
        ))}
      </>
    );
  } else {
    const noResultsText = query ? 'No results found.' : 'No recent searches.';
    searchItemListContent = <NoResultsText>{noResultsText}</NoResultsText>;
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
        onChange={onQueryChange}
        onFocus={handleOnInputFocus}
        onBlur={handleOnInputBlur}
      />
      <SearchBarInputSearchIcon />
      <FakeCheckbox
        ref={searchHistoryFakeCheckboxRef}
        id="checkbox_search_history"
        value={isOpen}
        onChange={handleOnFakeCheckboxChange}
      />
      <OverlayLabel htmlFor="checkbox_search_history" />
      {isOpen && (
        <SearchHistory $shouldCenterChild={shouldCenterChild}>
          {isLoading ? (
            <SearchHistorySpinner />
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
              <SearchItemList>{searchItemListContent}</SearchItemList>
            </SearchHistoryInner>
          )}
        </SearchHistory>
      )}
    </StyledSearchBar>
  );
};

export default SearchBar;
