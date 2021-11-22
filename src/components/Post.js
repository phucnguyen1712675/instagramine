import React from 'react';
import PropTypes from 'prop-types';
import dateFormat from 'dateformat';
import PostHeader from './PostHeader';
import PostActions from './PostActions';
import Avatar from './Avatar';
import Carousel from './Carousel';
import QuotationMarkIcon from './icons/QuotationMarkIcon';
import {
  StyledPost,
  PostBody,
  PostMedia,
  PostImage,
  PostLikedUsersInfo,
  PostLikedUsersStatement,
  PostLikedUsersHighlight,
  PostLikedUsersAvatars,
  PostLikedUsersAvatar,
  PostCaptionWrapper,
  PostCaption,
  PostDate,
  PostFooter,
} from './styled/Post.styled';

const Post = ({post}) => {
  const convertedPostDate = new Date(post.date * 1000);
  const formattedPostDate = dateFormat(convertedPostDate, 'ddd, dd mmmm yyyy');

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
      <PostBody>
        <PostMedia>
          {post.media.length === 1 ? (
            <PostImage src={post.media[0]} />
          ) : (
            <Carousel media={post.media} />
          )}
        </PostMedia>
        <PostActions isLiked={post.isLiked} isSaved={post.isSaved} />
        <PostLikedUsersInfo>
          <PostLikedUsersStatement>
            <span>{post.img ? 'Liked' : 'Viewed'} by </span>
            <PostLikedUsersHighlight href={post.likedUsersLink}>
              {post.likedUser}
            </PostLikedUsersHighlight>
            <span> and </span>
            <PostLikedUsersHighlight href={post.likedUsersLink}>
              {post.otherLikedUserAmount} others
            </PostLikedUsersHighlight>
          </PostLikedUsersStatement>
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
      </PostBody>
      <PostFooter>
        <PostCaptionWrapper>
          <QuotationMarkIcon />
          <PostCaption>{post.caption}</PostCaption>
        </PostCaptionWrapper>
        <PostDate>{formattedPostDate}</PostDate>
      </PostFooter>
    </StyledPost>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Post;
