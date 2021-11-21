import React from 'react';
import PropTypes from 'prop-types';
import PostHeader from './PostHeader';
import PostActions from './PostActions';
import Avatar from './Avatar';
import {
  StyledPost,
  PostBody,
  PostImageWrapper,
  PostImage,
  PostLikedUsersInfo,
  PostLikedUsersStatement,
  PostLikedUsersHighlight,
  PostLikedUsersAvatars,
  PostLikedUsersAvatar,
  PostCaptionSection,
  PostCaptionWrapper,
  PostCaption,
  PostDate,
  PostFooter,
} from './styled/Post.styled';
import QuotationMarkIcon from './icons/QuotationMarkIcon';

const Post = ({post}) => {
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
        <PostImageWrapper>
          <PostImage src={post.img} />
        </PostImageWrapper>
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
        <PostCaptionSection>
          <PostCaptionWrapper>
            <QuotationMarkIcon />
            <PostCaption>{post.caption}</PostCaption>
          </PostCaptionWrapper>
          <PostDate>{post.date}</PostDate>
        </PostCaptionSection>
      </PostBody>
      <PostFooter></PostFooter>
    </StyledPost>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Post;
