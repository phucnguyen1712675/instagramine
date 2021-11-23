import {forwardRef, useImperativeHandle, useState} from 'react';
import PropTypes from 'prop-types';
import {
  StyledPostLikedUsersStatement,
  PostLikedUsersHighlight,
} from './styled/PostLikedUsersStatement.styled';

const PostLikedUsersStatement = forwardRef(
  ({likedUsersLink, likedUser, otherLikedUserAmount}, ref) => {
    const [likeAmount, setLikeAmount] = useState(otherLikedUserAmount);

    useImperativeHandle(ref, () => ({
      increaseLikeAmount: (amount = 1) => {
        setLikeAmount((prevAmount) => prevAmount + amount);
      },
      decreaseLikeAmount: (amount = 1) => {
        setLikeAmount((prevAmount) => prevAmount - amount);
      },
    }));

    return (
      <StyledPostLikedUsersStatement>
        <span>Liked by </span>
        <PostLikedUsersHighlight href={likedUsersLink}>
          {likedUser}
        </PostLikedUsersHighlight>
        <span> and </span>
        <PostLikedUsersHighlight href={likedUsersLink}>
          {likeAmount} others
        </PostLikedUsersHighlight>
      </StyledPostLikedUsersStatement>
    );
  }
);

PostLikedUsersStatement.propTypes = {
  likedUsersLink: PropTypes.string.isRequired,
  likedUser: PropTypes.string.isRequired,
  otherLikedUserAmount: PropTypes.number.isRequired,
};

PostLikedUsersStatement.displayName = 'PostLikedUsersStatement';

export default PostLikedUsersStatement;
