import {useContext} from 'react';
import PropTypes from 'prop-types';
import {Button, Dot} from './styled/Lib';
import {
  StyledSearchHistoryItem,
  SearchHistoryItemContent,
  SearchHistoryUserAdditionalInfo,
} from './styled/SearchHistoryItem.styled';
import MultiplyIcon from './icons/MultiplyIcon';
import SearchHistoryResultsContext from '../store/search-history-results-context';

const SearchHistoryItem = ({user}) => {
  const {removeUser} = useContext(SearchHistoryResultsContext);

  const removeHistoryItemHandler = (e) => {
    e.preventDefault();
    removeUser(user.id);
  };

  const additionalInfoComponent = (
    <SearchHistoryUserAdditionalInfo>
      <span>{user.name}</span>
      {user.isFollowed && (
        <>
          <Dot />
          <span>Following</span>
        </>
      )}
    </SearchHistoryUserAdditionalInfo>
  );

  const optionComponent = (
    <Button onMouseDown={removeHistoryItemHandler}>
      <MultiplyIcon />
    </Button>
  );

  return (
    <StyledSearchHistoryItem>
      <a href={user.profile} onMouseDown={(e) => e.preventDefault()}>
        <SearchHistoryItemContent
          avatar={user.avatar}
          avatarSize="5.2rem"
          hasStory={user.hasStory}
          hasStoryBeenSeen={user.hasStoryBeenSeen}
          username={user.username}
          additionalInfoComponent={additionalInfoComponent}
          optionComponent={optionComponent}
          usernameAsHeading
        />
      </a>
    </StyledSearchHistoryItem>
  );
};

SearchHistoryItem.propTypes = {
  user: PropTypes.object.isRequired,
};

export default SearchHistoryItem;
