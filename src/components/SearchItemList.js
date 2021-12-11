import React from 'react';
import PropTypes from 'prop-types';
import {
  StyledSearchItemList,
  SearchHistoryItem,
  SearchHistoryItemLink,
  SearchHistoryItemContent,
  SearchHistoryItemAvatar,
  SearchHistoryUserAdditionalInfo,
  RemoveItemButton,
  RemoveHistoryItemButtonIcon,
  SearchHistoryUserAdditionalInfoDot,
} from './styled/SearchItemList.styled';
import {ADD_USER, REMOVE_USER} from '../actions/search-bar-actions';

let testId = 4;

const SearchItemList = ({users, hasQuery, dispatch}) => {
  const clickSearchItemHandler = (e, user) => {
    e.preventDefault();

    if (hasQuery) {
      const newSearchItem = {
        id: testId++,
        username: user.username,
        name: user.name,
        avatar: user.avatar,
        profile: user.profile,
        isFollowed: user.isFollowed,
        hasStory: user.hasStory,
        hasStoryBeenSeen: user.hasStoryBeenSeen,
      };

      dispatch({type: ADD_USER, payload: newSearchItem});
    }
  };

  const removeItemHandler = (e, id) => {
    e.preventDefault();

    dispatch({type: REMOVE_USER, payload: id});
  };

  return (
    <StyledSearchItemList>
      {users.map((user) => (
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
                !hasQuery ? (
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
    </StyledSearchItemList>
  );
};

SearchItemList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      profile: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
      hasStory: PropTypes.bool.isRequired,
      hasStoryBeenSeen: function (props, propName, componentName) {
        if (
          props['hasStory'] &&
          (props[propName] == undefined || typeof props[propName] != 'boolean')
        ) {
          return new Error(
            `Please provide 'hasStoryBeenSeen' prop for ${componentName}!`
          );
        }
      },
      isFollowed: PropTypes.bool.isRequired,
    })
  ),
  hasQuery: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
};

SearchItemList.defaultProps = {
  users: [],
  hasQuery: true,
};

export default SearchItemList;
