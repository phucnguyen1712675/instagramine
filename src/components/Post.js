import {useReducer} from 'react';
import PropTypes from 'prop-types';
import dateFormat from 'dateformat';
import moment from 'moment';
import Carousel from './Carousel';
import Avatar from './Avatar';
import ReadMore from './ReadMore';
import CommentIcon from './icons/CommentIcon';
import ShareIcon from './icons/ShareIcon';
import ThreeDotsIcon from './icons/ThreeDotsIcon';
import HeartICon from './icons/HeartIcon';
import SavedIcon from './icons/SavedIcon';
import {PostMediaWrapper} from './styled/Lib';
import {
  StyledPost,
  PostHeader,
  MoreOptionButton,
  PostContent,
  PostTopContent,
  PostBottomContent,
  PostActions,
  PostActionButton,
  LikedButton,
  SavedButton,
  PostLikedUsersInfo,
  PostLikedUsersStatement,
  PostLikedUsersHighlight,
  PostLikedUsersAvatarGroup,
  PostLikedUsersAvatar,
  PostCaptionContainer,
  PostCaptionWrapper,
  PostCaptionWrapperIcon,
  PostCaption,
  PostDate,
} from './styled/Post.styled';
import PostMedia from './PostMedia';
import {POST_CAPTION_SHOW_CHAR} from '../constants';
import PostReducer from '../reducers/post-reducer';
import {TOGGLE_IS_SAVED, LIKE_POST, UNLIKE_POST} from '../actions/post-actions';

const Post = ({post}) => {
  const [state, dispatch] = useReducer(PostReducer, {
    likeAmount: post.likeAmount,
    isLiked: post.isLiked,
    isSaved: post.isSaved,
  });

  const {likeAmount, isLiked, isSaved} = state;

  const mediaContent =
    post.media.length === 1 ? (
      <PostMediaWrapper>
        <PostMedia type={post.media[0].type} url={post.media[0].url} />
      </PostMediaWrapper>
    ) : (
      <Carousel media={post.media} />
    );

  const postCaptionContent =
    post.caption.length > POST_CAPTION_SHOW_CHAR ? (
      <PostCaption
        as={ReadMore}
        readMoreLink="https://www.instagram.com/p/B9yD_e0J2e1tZKaaw-jIJoYAvfeIYhQe7kSxZc0/"
      >
        {post.caption}
      </PostCaption>
    ) : (
      <PostCaption>{post.caption}</PostCaption>
    );

  const getDiffDays = (date1, date2 = Date.now()) => {
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatPostDate = (timestamp) => {
    const convertedDate = new Date(timestamp * 1000);
    const diffDays = getDiffDays(convertedDate);

    if (diffDays > 7) {
      const formattedDate = dateFormat(convertedDate, 'ddd, dd mmmm yyyy');
      return formattedDate;
    }

    const timeAgo = moment(convertedDate).fromNow();

    return timeAgo;
  };

  const formattedPostDate = formatPostDate(post.date);

  const likeButtonHandler = () => {
    if (isLiked) {
      dispatch({type: UNLIKE_POST});
    } else {
      dispatch({type: LIKE_POST});
    }
  };

  const savePostHandler = () => {
    dispatch({type: TOGGLE_IS_SAVED});
  };

  return (
    <StyledPost>
      <PostHeader
        avatarComponent={
          <Avatar
            url={post.avatar}
            hasStory={post.hasStory}
            hasStoryBeenSeen={post.hasStoryBeenSeen}
            asLink={!post.hasStory}
            profile={post.profile}
          />
        }
        topText={post.username}
        profile={post.profile}
        bottomTextComponent={
          <a href={location}>
            {post.city}, {post.country}
          </a>
        }
        optionComponent={
          <MoreOptionButton>
            <ThreeDotsIcon />
          </MoreOptionButton>
        }
      />
      <PostContent>
        <PostTopContent>{mediaContent}</PostTopContent>
        <PostBottomContent>
          <PostActions mediaLength={post.media.length}>
            <LikedButton
              type="text"
              onClick={likeButtonHandler}
              $isLiked={isLiked}
            >
              <HeartICon />
            </LikedButton>
            <PostActionButton type="text">
              <CommentIcon />
            </PostActionButton>
            <PostActionButton type="text">
              <ShareIcon />
            </PostActionButton>
            <SavedButton
              type="text"
              onClick={savePostHandler}
              $isSaved={isSaved}
            >
              <SavedIcon />
            </SavedButton>
          </PostActions>
          <PostLikedUsersInfo>
            <PostLikedUsersStatement>
              <span>Liked by </span>
              <PostLikedUsersHighlight href={post.likedUsersLink}>
                {post.likedUser}
              </PostLikedUsersHighlight>
              <span> and </span>
              <PostLikedUsersHighlight href={post.likedUsersLink}>
                {likeAmount} others
              </PostLikedUsersHighlight>
            </PostLikedUsersStatement>
            <PostLikedUsersAvatarGroup href={post.likedUsersLink}>
              {post.likedOtherUser.map((url, index) => (
                <PostLikedUsersAvatar key={index} url={url} />
              ))}
            </PostLikedUsersAvatarGroup>
          </PostLikedUsersInfo>
          <PostCaptionContainer>
            <PostCaptionWrapper>
              <PostCaptionWrapperIcon />
              {postCaptionContent}
            </PostCaptionWrapper>
            <PostDate>{formattedPostDate}</PostDate>
          </PostCaptionContainer>
        </PostBottomContent>
      </PostContent>
    </StyledPost>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    avatar: PropTypes.string.isRequired,
    profile: PropTypes.string.isRequired,
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
    username: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    media: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
      })
    ).isRequired,
    isLiked: PropTypes.bool.isRequired,
    isSaved: PropTypes.bool.isRequired,
    likedUser: PropTypes.string.isRequired,
    likedOtherUser: PropTypes.arrayOf(PropTypes.string).isRequired,
    likeAmount: PropTypes.number.isRequired,
    likedUsersLink: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    date: PropTypes.number.isRequired,
  }).isRequired,
};

export default Post;
