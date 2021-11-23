import {useRef} from 'react';
import PropTypes from 'prop-types';
import dateFormat from 'dateformat';
import PostHeader from './PostHeader';
import Avatar from './Avatar';
import Carousel from './Carousel';
import LikedButton from './LikedButton';
import SavedButton from './SavedButton';
import PostLikedUsersStatement from './PostLikedUsersStatement';
import CommentIcon from './icons/CommentIcon';
import ShareIcon from './icons/ShareIcon';
import QuotationMarkIcon from './icons/QuotationMarkIcon';
import {PostImageWrapper, PostImage} from './styled/Lib';
import {
  StyledPost,
  PostBody,
  PostActions,
  PostActionButton,
  PostLikedUsersInfo,
  PostLikedUsersAvatars,
  PostLikedUsersAvatar,
  PostCaptionContainer,
  PostCaptionWrapper,
  PostCaption,
  PostDate,
  PostFooter,
} from './styled/Post.styled';

const Post = ({post}) => {
  const postLikedUsersStatementRef = useRef(null);

  const mediaContent =
    post.media.length === 1 ? (
      <PostImageWrapper>
        <PostImage src={post.media[0]} />
      </PostImageWrapper>
    ) : (
      <Carousel media={post.media} />
    );
  const convertedPostDate = new Date(post.date * 1000);
  const formattedPostDate = dateFormat(convertedPostDate, 'ddd, dd mmmm yyyy');

  const increaseLikeAmount = () =>
    postLikedUsersStatementRef.current.increaseLikeAmount();

  const decreaseLikeAmount = () =>
    postLikedUsersStatementRef.current.decreaseLikeAmount();

  return (
    <StyledPost>
      <PostHeader
        avatar={post.avatar}
        hasStory={post.hasStory}
        hasStoryBeenSeen={post.hasStoryBeenSeen}
        username={post.username}
        profile={post.profile}
        city={post.city}
        country={post.country}
        location={post.location}
      />
      <PostBody>{mediaContent}</PostBody>
      <PostFooter>
        <PostActions mediaLength={post.media.length}>
          <LikedButton
            isLiked={post.isLiked}
            increaseLikeAmount={increaseLikeAmount}
            decreaseLikeAmount={decreaseLikeAmount}
          />
          <PostActionButton>
            <CommentIcon />
          </PostActionButton>
          <PostActionButton>
            <ShareIcon />
          </PostActionButton>
          <SavedButton isSaved={post.isSaved} />
        </PostActions>
        <PostLikedUsersInfo>
          <PostLikedUsersStatement
            ref={postLikedUsersStatementRef}
            likedUsersLink={post.likedUsersLink}
            likedUser={post.likedUser}
            otherLikedUserAmount={post.otherLikedUserAmount}
          />
          <PostLikedUsersAvatars href={post.likedUsersLink}>
            {post.likedOtherUser.map((url, index) => (
              <PostLikedUsersAvatar
                as={Avatar}
                key={index}
                url={url}
                size="1.5rem"
                hasStory={false}
              />
            ))}
          </PostLikedUsersAvatars>
        </PostLikedUsersInfo>
        <PostCaptionContainer>
          <PostCaptionWrapper>
            <QuotationMarkIcon />
            <PostCaption>{post.caption}</PostCaption>
          </PostCaptionWrapper>
          <PostDate>{formattedPostDate}</PostDate>
        </PostCaptionContainer>
      </PostFooter>
    </StyledPost>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Post;
