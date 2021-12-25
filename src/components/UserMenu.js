import React from 'react';
import NotificationButton from './NotificationButton';
import {PlayIcon} from './icons';
import {
  StyledUserMenu,
  UserMenuTopContent,
  UserMenuMiddleContent,
  UserMenuBottomContent,
  ThumbnailContentAvatar,
  ThumbnailContentUserName,
  ThumbnailContentJobDescription,
  EditButtonWrapper,
  EditButton,
  SectionTitle,
  StatisticalContent,
  StatisticalContentInner,
  StatisticalContentInnerDot,
  StatisticItem,
  StatisticNumber,
  StatisticName,
  BioContentContainer,
  BioContent,
  BioContentSocialLinks,
  BioContentSocialLink,
  StoriesContent,
  StoriesContentStoryList,
  StoriesContentStoryItem,
  StoriesContentStoryItemInner,
  StoriesContentStoryItemName,
  StoriesContentCircleImgWrapper,
  StoriesContentCircleImg,
  PlayButton,
  CreatePostButton,
} from './styled/UserMenu.styled';
import {MAX_STORIES_NUMBER} from '../constants';
import {onErrorMedia} from '../utils/media';
import {useAuth} from '../hooks';

const kFormatter = (num) =>
  Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'K'
    : Math.sign(num) * Math.abs(num);

const socialLinkFormatter = (socialLink) =>
  socialLink.replace('https://', 'www.');

const UserMenu = () => {
  const auth = useAuth();

  const socialLinksContent = auth.user.socialLinks
    ?.slice(0, 3)
    .map((link, index) => (
      <BioContentSocialLink key={index} href={link}>
        {socialLinkFormatter(link)}
      </BioContentSocialLink>
    ));

  const storiesContent = auth.user.storyCategories
    ?.map((story) => (
      <StoriesContentStoryItem key={story.id}>
        <StoriesContentStoryItemInner>
          <StoriesContentCircleImgWrapper>
            <StoriesContentCircleImg
              src={story.thumbnail}
              alt=""
              onError={onErrorMedia}
            />
          </StoriesContentCircleImgWrapper>
          <StoriesContentStoryItemName>
            {story.name}
          </StoriesContentStoryItemName>
        </StoriesContentStoryItemInner>
      </StoriesContentStoryItem>
    ))
    .concat(
      <StoriesContentStoryItem key={MAX_STORIES_NUMBER}>
        <PlayButton
          size="large"
          shape="circle"
          icon={<PlayIcon />}
          disabledHover
        />
        <StoriesContentStoryItemName>Play All</StoriesContentStoryItemName>
      </StoriesContentStoryItem>
    );

  return (
    <StyledUserMenu>
      <UserMenuTopContent>
        <ThumbnailContentAvatar
          url={auth.user.avatar}
          hasStory={auth.user.hasStory}
          hasStoryBeenSeen={auth.user.hasStoryBeenSeen}
        />
        <ThumbnailContentUserName>
          {auth.user.username}
        </ThumbnailContentUserName>
        <ThumbnailContentJobDescription>
          {auth.user.job}
        </ThumbnailContentJobDescription>
        <EditButtonWrapper content="Edit profile" position="left">
          <EditButton type="primary" size="large">
            Edit
          </EditButton>
        </EditButtonWrapper>
      </UserMenuTopContent>
      <UserMenuMiddleContent>
        <StatisticalContent>
          <StatisticalContentInner>
            {[
              auth.user.numberOfPosts,
              auth.user.numberOfFollowers,
              auth.user.numberOfFollowingUsers,
            ].map((field, index) => {
              if (index === 2) {
                return (
                  <StatisticItem key={index}>
                    <StatisticNumber>{kFormatter(field)}</StatisticNumber>
                    <StatisticName>Posts</StatisticName>
                  </StatisticItem>
                );
              }
              return (
                <React.Fragment key={index}>
                  <StatisticItem>
                    <StatisticNumber>{kFormatter(field)}</StatisticNumber>
                    <StatisticName>Posts</StatisticName>
                  </StatisticItem>
                  <StatisticalContentInnerDot />
                </React.Fragment>
              );
            })}
          </StatisticalContentInner>
        </StatisticalContent>
        <BioContentContainer>
          <SectionTitle>{auth.user.name}</SectionTitle>
          <BioContent
            showChar={49}
            readMoreText="(Read more)"
            showLessText="(Show less)"
            readMoreLink="https://www.instagram.com/phuc7320/"
          >
            {auth.user.bio}
          </BioContent>
          <BioContentSocialLinks>{socialLinksContent}</BioContentSocialLinks>
        </BioContentContainer>
      </UserMenuMiddleContent>
      <UserMenuBottomContent>
        <StoriesContent>
          <SectionTitle>Your Stories</SectionTitle>
          <StoriesContentStoryList>{storiesContent}</StoriesContentStoryList>
        </StoriesContent>
        <CreatePostButton type="primary" size="large" block>
          Create Post
        </CreatePostButton>
      </UserMenuBottomContent>
      <NotificationButton />
    </StyledUserMenu>
  );
};

export default UserMenu;
