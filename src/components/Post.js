import {useRef} from 'react';
import PropTypes from 'prop-types';
import PostHeader from './PostHeader';
import Avatar from './Avatar';
import Carousel from './Carousel';
import LikedButton from './LikedButton';
import SavedButton from './SavedButton';
import PostLikedUsersStatement from './PostLikedUsersStatement';
import ReadMore from './ReadMore';
import CommentIcon from './icons/CommentIcon';
import ShareIcon from './icons/ShareIcon';
import QuotationMarkIcon from './icons/QuotationMarkIcon';
import {PostMediaWrapper, PostImage} from './styled/Lib';
import {
  StyledPost,
  PostContent,
  PostTopContent,
  PostBottomContent,
  PostActions,
  PostActionButton,
  PostLikedUsersInfo,
  PostLikedUsersAvatars,
  PostLikedUsersAvatar,
  PostCaptionContainer,
  PostCaptionWrapper,
  PostCaption,
  PostDate,
} from './styled/Post.styled';
import {onErrorImage} from '../utils/media';
import {formatPostDate} from '../utils/formatter';
import {POST_CAPTION_SHOW_CHAR} from '../constants/post';

const Post = ({post}) => {
  const postLikedUsersStatementRef = useRef(null);

  const mediaContent =
    post.media.length === 1 ? (
      <PostMediaWrapper>
        <PostImage src={post.media[0]} onError={onErrorImage} />
      </PostMediaWrapper>
    ) : (
      <Carousel media={post.media} />
    );

  const formattedPostDate = formatPostDate(post.date);

  const postCaptionContent =
    post.caption.length > POST_CAPTION_SHOW_CHAR ? (
      <PostCaption
        as={ReadMore}
        showChar={POST_CAPTION_SHOW_CHAR}
        readMoreLink="https://www.instagram.com/p/B9yD_e0J2e1tZKaaw-jIJoYAvfeIYhQe7kSxZc0/"
      >
        {post.caption}
      </PostCaption>
    ) : (
      <PostCaption>{post.caption}</PostCaption>
    );

  const changePostLikeAmountHandler = (isLiked) => {
    isLiked
      ? postLikedUsersStatementRef.current.decreaseLikeAmount()
      : postLikedUsersStatementRef.current.increaseLikeAmount();
  };

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
