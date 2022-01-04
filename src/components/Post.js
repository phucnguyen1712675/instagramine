import {useReducer} from 'react';
import PropTypes from 'prop-types';
import {useLocation} from 'react-router-dom';
import Carousel from './Carousel';
import Avatar from './Avatar';
import ReadMore from './ReadMore';
import PostMedia from './PostMedia';
import {
  CommentIcon,
  ShareIcon,
  ThreeDotsIcon,
  HeartIcon,
  SavedIcon,
} from './icons';
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
import {POST_CAPTION_SHOW_CHAR, ROUTE_PATHS} from '../constants';
import {useAuth} from '../hooks';
import {postReducer} from '../reducers';
import {
  likePostRequest,
  unlikePostRequest,
  addJunctionUserSavedPost,
  removeJunctionUserSavedPost,
} from '../services/firestore';
import {formatPostDate} from '../utils/formatters';
import {TOGGLE_IS_SAVED, LIKE_POST, UNLIKE_POST} from '../actions/postActions';

const Post = ({post, removeSavedPostHandler}) => {
  const [state, dispatch] = useReducer(postReducer, {
    likeAmount: post.likeAmount,
    isLiked: post.isLiked,
    isSaved: post.isSaved,
  });

  const auth = useAuth();

  const location = useLocation();

  const likePostHandler = () => {
    const junctionObj = {
      uid: auth.authUser.id,
      likedPostId: post.id,
    };

    if (!state.isLiked) {
      likePostRequest(junctionObj);
      dispatch({
        type: LIKE_POST,
      });
    } else {
      unlikePostRequest(junctionObj);
      dispatch({
        type: UNLIKE_POST,
      });
    }
  };

  const savePostHandler = () => {
    const junctionObj = {
      uid: auth.authUser.id,
      savedPostId: post.id,
    };

    if (!state.isSaved) {
      addJunctionUserSavedPost(junctionObj);
    } else {
      removeJunctionUserSavedPost(junctionObj);

      if (location.pathname === `/${ROUTE_PATHS.SAVED}`) {
        removeSavedPostHandler(post.id);
      }
    }

    dispatch({
      type: TOGGLE_IS_SAVED,
    });
  };

  const {owner} = post;

  const hasOneItem = post.media.length === 1;

  return (
    <StyledPost>
      <PostHeader
        avatarComponent={
          <Avatar
            url={owner.avatar}
            hasStory={owner.hasStory}
            hasStoryBeenSeen={owner.hasStoryBeenSeen}
            asLink={!owner.hasStory}
            profile={owner.profile}
          />
        }
        topText={owner.username}
        profile={owner.profile}
        bottomTextComponent={
          <a href={location}>
            {owner.city}, {owner.country}
          </a>
        }
        optionComponent={
          <MoreOptionButton>
            <ThreeDotsIcon />
          </MoreOptionButton>
        }
      />
      <PostContent>
        <PostTopContent>
          {hasOneItem ? (
            <PostMediaWrapper>
              <PostMedia type={post.media[0].type} url={post.media[0].url} />
            </PostMediaWrapper>
          ) : (
            <Carousel media={post.media} />
          )}
        </PostTopContent>
        <PostBottomContent>
          <PostActions mediaLength={post.media.length}>
            <LikedButton
              type="text"
              onClick={likePostHandler}
              $isLiked={state.isLiked}
            >
              <HeartIcon />
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
              $isSaved={state.isSaved}
            >
              <SavedIcon />
            </SavedButton>
          </PostActions>
          <PostLikedUsersInfo>
            <PostLikedUsersStatement>
              {post.likedUsers.length > 0 ? (
                <>
                  <span>Liked by </span>
                  <PostLikedUsersHighlight href={post.likedUsersLink}>
                    {post.likedUsers[0].name}
                  </PostLikedUsersHighlight>
                  <span> and </span>
                  <PostLikedUsersHighlight href={post.likedUsersLink}>
                    {state.likeAmount} others
                  </PostLikedUsersHighlight>
                </>
              ) : (
                <></>
              )}
            </PostLikedUsersStatement>
            {post.likedUsers.length > 0 ? (
              <PostLikedUsersAvatarGroup href={post.likedUsersLink}>
                {post.fakeLikedOtherUserAvatars.map((url, index) => (
                  <PostLikedUsersAvatar key={index} url={url} />
                ))}
              </PostLikedUsersAvatarGroup>
            ) : (
              <></>
            )}
          </PostLikedUsersInfo>
          <PostCaptionContainer>
            <PostCaptionWrapper>
              <PostCaptionWrapperIcon />
              {post.caption.length > POST_CAPTION_SHOW_CHAR ? (
                <PostCaption
                  as={ReadMore}
                  readMoreLink="https://www.instagram.com/p/B9yD_e0J2e1tZKaaw-jIJoYAvfeIYhQe7kSxZc0/"
                >
                  {post.caption}
                </PostCaption>
              ) : (
                <PostCaption>{post.caption}</PostCaption>
              )}
            </PostCaptionWrapper>
            <PostDate>{formatPostDate(post.createdAt)}</PostDate>
          </PostCaptionContainer>
        </PostBottomContent>
      </PostContent>
    </StyledPost>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      username: PropTypes.string.isRequired,
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
      city: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
    }),
    location: PropTypes.string.isRequired,
    media: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        duration: PropTypes.number,
      })
    ).isRequired,
    isLiked: PropTypes.bool.isRequired,
    isSaved: PropTypes.bool.isRequired,
    likedUsersLink: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired,
    likedUsers: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
      })
    ).isRequired,
    likeAmount: PropTypes.number.isRequired,
    fakeLikedOtherUserAvatars: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  removeSavedPostHandler: PropTypes.func,
};

export default Post;
