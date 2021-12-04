import {useRef} from 'react';
import PropTypes from 'prop-types';
import dateFormat from 'dateformat';
import moment from 'moment';
import Carousel from './Carousel';
import LikedButton from './LikedButton';
import SavedButton from './SavedButton';
import Avatar from './Avatar';
import PostLikedUsersStatement from './PostLikedUsersStatement';
import ReadMore from './ReadMore';
import CommentIcon from './icons/CommentIcon';
import ShareIcon from './icons/ShareIcon';
import {PostMediaWrapper} from './styled/Lib';
import {
  StyledPost,
  PostHeader,
  PostHeaderLocation,
  MoreOptionButton,
  MoreOptionButtonIcon,
  PostContent,
  PostTopContent,
  PostBottomContent,
  PostActions,
  PostActionButton,
  PostLikedUsersInfo,
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

const Post = ({post}) => {
  const postLikedUsersStatementRef = useRef(null);

  const avatarComponent = (
    <Avatar
      url={post.avatar}
      hasStory={post.hasStory}
      hasStoryBeenSeen={post.hasStoryBeenSeen}
      asLink={!post.hasStory}
      profile={post.profile}
    />
  );

  const bottomTextComponent = (
    <PostHeaderLocation href={location}>
      {post.city}, {post.country}
    </PostHeaderLocation>
  );

  const optionComponent = (
    <MoreOptionButton>
      <MoreOptionButtonIcon />
    </MoreOptionButton>
  );

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

  const changePostLikeAmountHandler = (isLiked) => {
    isLiked
      ? postLikedUsersStatementRef.current.decreaseLikeAmount()
      : postLikedUsersStatementRef.current.increaseLikeAmount();
  };

  return (
    <StyledPost>
      <PostHeader
        avatarComponent={avatarComponent}
        topText={post.username}
        profile={post.profile}
        bottomTextComponent={bottomTextComponent}
        optionComponent={optionComponent}
      />
      <PostContent>
        <PostTopContent>{mediaContent}</PostTopContent>
        <PostBottomContent>
          <PostActions mediaLength={post.media.length}>
            <LikedButton
              isLiked={post.isLiked}
              changePostLikeAmountHandler={changePostLikeAmountHandler}
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
            <PostLikedUsersAvatarGroup href={post.likedUsersLink}>
              {post.likedOtherUser.map((url, index) => (
                <PostLikedUsersAvatar key={index} url={url} hasStory={false} />
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
  post: PropTypes.object.isRequired,
};

export default Post;
