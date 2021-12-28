import {useReducer} from 'react';
import Carousel from './Carousel';
import Avatar from './Avatar';
import ReadMore from './ReadMore';
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
import PostMedia from './PostMedia';
import {POST_CAPTION_SHOW_CHAR} from '../constants';
import {useSavedPosts} from '../hooks';
import {postPropTypes} from '../prop-types';
import {postReducer} from '../reducers';
import {formatPostDate} from '../utils/formatters';
import {TOGGLE_IS_SAVED, LIKE_POST, UNLIKE_POST} from '../actions/postActions';

const Post = ({post}) => {
  const {savePost, unsavePost, isSavedPost} = useSavedPosts();

  const [state, dispatch] = useReducer(postReducer, {
    likeAmount: post.likeAmount,
    isLiked: post.isLiked,
    isSaved: isSavedPost(post.id),
  });

  const likeButtonHandler = () => {
    dispatch({type: !state.isLiked ? LIKE_POST : UNLIKE_POST});
  };

  const savePostHandler = () => {
    if (state.isSaved) {
      unsavePost(post.id);
    } else {
      savePost(post);
    }

    dispatch({type: TOGGLE_IS_SAVED});
  };

  const hasOneItem = post.media.length === 1;

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
              onClick={likeButtonHandler}
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
              <span>Liked by </span>
              <PostLikedUsersHighlight href={post.likedUsersLink}>
                {post.likedUser}
              </PostLikedUsersHighlight>
              <span> and </span>
              <PostLikedUsersHighlight href={post.likedUsersLink}>
                {state.likeAmount} others
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
            <PostDate>{formatPostDate(post.date)}</PostDate>
          </PostCaptionContainer>
        </PostBottomContent>
      </PostContent>
    </StyledPost>
  );
};

Post.propTypes = {
  post: postPropTypes.isRequired,
};

export default Post;
