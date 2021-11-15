import {useContext} from 'react';
import PropTypes from 'prop-types';
import Avatar from './Avatar';
import {Button} from './styled/Lib';
import {
  StyledSearchHistoryItem,
  SearchHistoryContentWrapper,
  SearchHistoryContent,
  Dot,
} from './styled/SearchHistoryItem.styled';
import MultiplyIcon from './icons/MultiplyIcon';
import SearchHistoryResultsContext from '../store/search-history-results-context';

const SearchHistoryItem = ({user}) => {
  const {removeUser} = useContext(SearchHistoryResultsContext);

  const removeHistoryItemHandler = (e) => {
    e.preventDefault();
    removeUser(user.id);
  };

  return (
    <StyledSearchHistoryItem>
      <a href={user.profile}>
        <Avatar
          size={52}
          url={user.avatar}
          hasStory={user.hasStory}
          hasStoryBeenSeen={user.hasStoryBeenSeen}
        />
        <SearchHistoryContentWrapper>
          <SearchHistoryContent>
            <h4>{user.username}</h4>
            <div>
              <span>{user.name}</span>
              {user.isFollowed && (
                <>
                  <Dot />
                  <span>Following</span>
                </>
              )}
            </div>
          </SearchHistoryContent>
        </SearchHistoryContentWrapper>
        <Button onClick={removeHistoryItemHandler}>
          <MultiplyIcon />
        </Button>
      </a>
    </StyledSearchHistoryItem>
  );
};

SearchHistoryItem.propTypes = {
  user: PropTypes.object.isRequired,
};

export default SearchHistoryItem;
