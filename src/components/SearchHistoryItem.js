import {useContext} from 'react';
import PropTypes from 'prop-types';
import UserCard from './UserCard';
import {Button, Dot} from './styled/Lib';
import {StyledSearchHistoryItem} from './styled/SearchHistoryItem.styled';
import MultiplyIcon from './icons/MultiplyIcon';
import SearchHistoryResultsContext from '../store/search-history-results-context';

const SearchHistoryItem = ({user}) => {
  const {removeUser} = useContext(SearchHistoryResultsContext);

  const removeHistoryItemHandler = (e) => {
    e.preventDefault();
    removeUser(user.id);
  };

  const additionalInfoComponent = (
    <>
      <Dot />
      <span>Following</span>
    </>
  );

  const optionComponent = (
    <Button onMouseDown={removeHistoryItemHandler}>
      <MultiplyIcon />
    </Button>
  );

  return (
    <StyledSearchHistoryItem>
      <a href={user.profile} onMouseDown={(e) => e.preventDefault()}>
        <UserCard
          avatar={user.avatar}
          avatarSize="5.2rem"
          hasStory={user.hasStory}
          hasStoryBeenSeen={user.hasStoryBeenSeen}
          username={user.username}
          additionalInfoComponent={
            <>
              <span>{user.name}</span>
              {user.isFollowed ?? additionalInfoComponent}
            </>
          }
          optionComponent={optionComponent}
        />
      </a>
    </StyledSearchHistoryItem>
  );
};

SearchHistoryItem.propTypes = {
  user: PropTypes.object.isRequired,
};

export default SearchHistoryItem;
