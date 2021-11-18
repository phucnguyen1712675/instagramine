import {useContext} from 'react';
import Avatar from './Avatar';
import {Button, Dot, CircleImg} from './styled/Lib';
import {
  StyledUserMenu,
  UserMenuInner,
  NotificationButton,
  ThumbnailContent,
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
  PlayButton,
  CreatePostButton,
} from './styled/UserMenu.styled';
import BellIcon from './icons/BellIcon';
import PlayIcon from './icons/PlayIcon';
import GlobalContext from '../store/global-context';
import {kFormatter, socialLinkFormatter} from '../utils/formatter';

const MAX_SOCIAL_LINK_NUMBER = 3;
const MAX_STORIES_NUMBER = 3;

const UserMenu = () => {
  const {currentUser} = useContext(GlobalContext);

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
          <CircleImg size="6rem">
            <img src={story.thumbnail} />
          </CircleImg>
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
          <Button>Edit</Button>
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
          <BioContentBio>{currentUser.bio}</BioContentBio>
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
