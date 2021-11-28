import {useContext} from 'react';
import {ThemeContext} from 'styled-components';
import {
  StyledUserMenu,
  UserMenuInner,
  NotificationButton,
  ThumbnailContent,
  ThumbnailContentAvatar,
  ThumbnailContentUserName,
  ThumbnailContentJobDescription,
  EditButton,
  StatisticalContent,
  StatisticalContentInner,
  StatisticalContentInnerDot,
  StatisticItem,
  StatisticNumber,
  StatisticName,
  BioContent,
  BioContentUsername,
  BioContentBio,
  BioContentSocialLinks,
  BioContentSocialLink,
  StoriesContent,
  StoriesContentTitle,
  StoriesContentStoryList,
  StoriesContentStoryItem,
  StoriesContentStoryItemInner,
  StoriesContentStoryItemCateName,
  StoriesContentCircleImgWrapper,
  StoriesContentCircleImg,
  PlayButton,
  CreatePostButton,
} from './styled/UserMenu.styled';
import BellIcon from './icons/BellIcon';
import PlayIcon from './icons/PlayIcon';
import GlobalContext from '../store/global-context';
import {
  MAX_SOCIAL_LINK_NUMBER,
  MAX_STORIES_NUMBER,
} from '../constants/user-menu';
import {kFormatter, socialLinkFormatter} from '../utils/formatter';
import {onErrorImage} from '../utils/media';

const UserMenu = () => {
  const {currentUser} = useContext(GlobalContext);

  const {storyThumbnailSize} = useContext(ThemeContext);

  const socialLinksContent = currentUser.socialLinks
    .slice(0, MAX_SOCIAL_LINK_NUMBER)
    .map((link, index) => (
      <BioContentSocialLink key={index} href={link}>
        {socialLinkFormatter(link)}
      </BioContentSocialLink>
    ));

  const playStoriesButton = (
    <StoriesContentStoryItem key={MAX_STORIES_NUMBER}>
      <PlayButton>
        <PlayIcon />
      </PlayButton>
      <p>Play All</p>
    </StoriesContentStoryItem>
  );

  const storiesContent = currentUser.storiesCategory
    .slice(0, MAX_STORIES_NUMBER)
    .map((story, index) => (
      <StoriesContentStoryItem key={index}>
        <StoriesContentStoryItemInner>
          <StoriesContentCircleImgWrapper size={storyThumbnailSize}>
            <StoriesContentCircleImg
              src={story.thumbnail}
              alt=""
              onError={onErrorImage}
            />
          </StoriesContentCircleImgWrapper>
          <StoriesContentStoryItemCateName>
            {story.name}
          </StoriesContentStoryItemCateName>
        </StoriesContentStoryItemInner>
      </StoriesContentStoryItem>
    ))
    .concat(playStoriesButton);

  return (
    <StyledUserMenu>
      <UserMenuInner>
        <NotificationButton>
          <BellIcon />
        </NotificationButton>
        <ThumbnailContent>
          <ThumbnailContentAvatar
            url={currentUser.avatar}
            hasStory={currentUser.hasStory}
            hasStoryBeenSeen={currentUser.hasStoryBeenSeen}
          />
          <ThumbnailContentUserName>
            {currentUser.username}
          </ThumbnailContentUserName>
          <ThumbnailContentJobDescription>
            {currentUser.job}
          </ThumbnailContentJobDescription>
          <EditButton>Edit</EditButton>
        </ThumbnailContent>
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
        <BioContent>
          <BioContentUsername>{currentUser.name}</BioContentUsername>
          <BioContentBio
            showChar={80}
            readMoreText="Read More"
            showLessText="Show Less"
            readMoreLink={currentUser.socialLinks[0]}
          >
            {currentUser.bio}
          </BioContentBio>
          <BioContentSocialLinks>{socialLinksContent}</BioContentSocialLinks>
        </BioContent>
        <StoriesContent>
          <StoriesContentTitle>Your Stories</StoriesContentTitle>
          <StoriesContentStoryList>{storiesContent}</StoriesContentStoryList>
        </StoriesContent>
        <CreatePostButton>Create Post</CreatePostButton>
      </UserMenuInner>
    </StyledUserMenu>
  );
};

export default UserMenu;
