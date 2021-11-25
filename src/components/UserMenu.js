import {useContext} from 'react';
import {ThemeContext} from 'styled-components';
import Avatar from './Avatar';
import {Dot} from './styled/Lib';
import {
  StyledUserMenu,
  UserMenuInner,
  NotificationButton,
  ThumbnailContent,
  EditButton,
  StatisticalContent,
  StatisticalContentInner,
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
        <div>
          <StoriesContentCircleImg size={storyThumbnailSize}>
            <img src={story.thumbnail} alt="" onError={onErrorImage} />
          </StoriesContentCircleImg>
          <p>{story.name}</p>
        </div>
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
          <Avatar
            url={currentUser.avatar}
            size="8rem"
            hasStory={currentUser.hasStory}
            hasStoryBeenSeen={currentUser.hasStoryBeenSeen}
          />
          <h2>{currentUser.username}</h2>
          <h5>{currentUser.job}</h5>
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
            <Dot />
            <StatisticItem>
              <StatisticNumber>
                {kFormatter(currentUser.followersNumber)}
              </StatisticNumber>
              <StatisticName>Followers</StatisticName>
            </StatisticItem>
            <Dot />
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
