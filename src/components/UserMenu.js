import {useContext} from 'react';
import NotificationButton from './NotificationButton';
import PlayIcon from './icons/PlayIcon';
import {
  StyledUserMenu,
  UserMenuInner,
  ThumbnailContent,
  ThumbnailContentAvatar,
  ThumbnailContentUserName,
  ThumbnailContentJobDescription,
  EditButtonWrapper,
  EditButton,
  StatisticalContent,
  StatisticalContentInner,
  StatisticalContentInnerDot,
  StatisticItem,
  StatisticNumber,
  StatisticName,
  BioContentContainer,
  BioContentUsername,
  BioContent,
  BioContentSocialLinks,
  BioContentSocialLink,
  StoriesContent,
  StoriesContentTitle,
  StoriesContentStoryList,
  StoriesContentStoryItem,
  StoriesContentStoryItemInner,
  StoriesContentStoryItemName,
  StoriesContentCircleImgWrapper,
  StoriesContentCircleImg,
  PlayButton,
  CreatePostButton,
} from './styled/UserMenu.styled';
import GlobalContext from '../store/global-context';
import {
  MAX_SOCIAL_LINK_NUMBER,
  MAX_STORIES_NUMBER,
  MAX_CHARS_BIO_USER_MENU,
} from '../constants';
import {onErrorMedia} from '../utils/media';

const UserMenu = () => {
  const {currentUser} = useContext(GlobalContext);

  const kFormatter = (num) =>
    Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'K'
      : Math.sign(num) * Math.abs(num);

  const socialLinkFormatter = (socialLink) =>
    socialLink.replace('https://', 'www.');

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
      <UserMenuInner>
        <NotificationButton followRequests={currentUser.followRequests} />
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
          <EditButtonWrapper content="Edit profile" position="left">
            <EditButton>Edit</EditButton>
          </EditButtonWrapper>
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
        <BioContentContainer>
          <BioContentUsername>{currentUser.name}</BioContentUsername>
          <BioContent
            showChar={MAX_CHARS_BIO_USER_MENU}
            readMoreText="(Read more)"
            showLessText="(Show less)"
            readMoreLink={currentUser.profile}
          >
            {currentUser.bio}
          </BioContent>
          <BioContentSocialLinks>{socialLinksContent}</BioContentSocialLinks>
        </BioContentContainer>
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
