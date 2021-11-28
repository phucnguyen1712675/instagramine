import {useContext} from 'react';
import PropTypes from 'prop-types';
import {Button} from './styled/Lib';
import {
  StyledSearchHistoryItem,
  SearchHistoryItemLink,
  SearchHistoryItemContent,
  RemoveHistoryItemButtonIcon,
  SearchHistoryItemAvatar,
  SearchHistoryUserAdditionalInfo,
  SearchHistoryUserAdditionalInfoDot,
} from './styled/SearchHistoryItem.styled';
import SearchHistoryResultsContext from '../store/search-history-results-context';

const SearchHistoryItem = ({user}) => {
  const {removeUser} = useContext(SearchHistoryResultsContext);

  const removeHistoryItemHandler = (e) => {
    e.preventDefault();
    removeUser(user.id);
  };

  const avatarComponent = (
    <SearchHistoryItemAvatar
      url={user.avatar}
      hasStory={user.hasStory}
      hasStoryBeenSeen={user.hasStoryBeenSeen}
      disableOnClickHandler
    />
  );

  const additionalInfoComponent = (
    <SearchHistoryUserAdditionalInfo>
      <span>{user.name}</span>
      {user.isFollowed && (
        <>
          <SearchHistoryUserAdditionalInfoDot />
          <span>Following</span>
        </>
      )}
    </SearchHistoryUserAdditionalInfo>
  );

  const optionComponent = (
    <Button onMouseDown={removeHistoryItemHandler}>
      <RemoveHistoryItemButtonIcon />
    </Button>
  );

  return (
    <StyledSearchHistoryItem>
      <SearchHistoryItemLink
        href={user.profile}
        onMouseDown={(e) => e.preventDefault()}
      >
        <SearchHistoryItemContent
          avatarComponent={avatarComponent}
          username={user.username}
          additionalInfoComponent={additionalInfoComponent}
          optionComponent={optionComponent}
          usernameAsHeading
        />
      </SearchHistoryItemLink>
    </StyledSearchHistoryItem>
  );
};

SearchHistoryItem.propTypes = {
  user: PropTypes.object.isRequired,
};

export default SearchHistoryItem;
