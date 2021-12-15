import React from 'react';
import NotificationButton from './NotificationButton';
import PlayIcon from './icons/PlayIcon';
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
import {useAuth} from '../hooks/useAuth';
import currentUser from '../data/current-user';

const UserMenu = () => {
  const auth = useAuth();

  const kFormatter = (num) =>
    Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'K'
      : Math.sign(num) * Math.abs(num);

  const socialLinkFormatter = (socialLink) =>
    socialLink.replace('https://', 'www.');

  const socialLinksContent = currentUser.socialLinks
    .slice(0, 3)
    .map((link, index) => (
      <BioContentSocialLink key={index} href={link}>
        {socialLinkFormatter(link)}
      </BioContentSocialLink>
    ));

  const playStoriesButton = (
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

  const storiesContent = currentUser.storiesCategory
    .slice(0, MAX_STORIES_NUMBER)
    .map((story, index) => (
      <StoriesContentStoryItem key={index}>
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
    .concat(playStoriesButton);

  return (
    <StyledUserMenu>
      <UserMenuTopContent>
        <ThumbnailContentAvatar
          url={currentUser.avatar}
          hasStory={currentUser.hasStory}
          hasStoryBeenSeen={currentUser.hasStoryBeenSeen}
        />
        <ThumbnailContentUserName>
          {auth.user.username}
        </ThumbnailContentUserName>
        <ThumbnailContentJobDescription>
          {currentUser.job}
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
            <StatisticItem>
              <StatisticNumber>
                {kFormatter(currentUser.postsNumber)}
              </StatisticNumber>
              <StatisticName>Posts</StatisticName>
            </StatisticItem>
            <StatisticalContentInnerDot />
            <StatisticItem>
              <StatisticNumber>
                {kFormatter(currentUser.followersNumber)}
              </StatisticNumber>
              <StatisticName>Followers</StatisticName>
            </StatisticItem>
            <StatisticalContentInnerDot />
            <StatisticItem>
              <StatisticNumber>
                {kFormatter(currentUser.followingNumber)}
              </StatisticNumber>
              <StatisticName>Followings</StatisticName>
            </StatisticItem>
          </StatisticalContentInner>
        </StatisticalContent>
        <BioContentContainer>
          <SectionTitle>{currentUser.name}</SectionTitle>
          <BioContent
            showChar={49}
            readMoreText="(Read more)"
            showLessText="(Show less)"
            readMoreLink={currentUser.profile}
          >
            {currentUser.bio}
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
