import {useState, useEffect, Fragment} from 'react';
import NotificationButton from './NotificationButton';
import {PlayIcon, PlusIcon} from './icons';
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
  BioContentNoSocialLinks,
  StoriesContent,
  StoriesContentStoryList,
  StoriesContentStoryItem,
  StoriesContentStoryItemInner,
  StoriesContentStoryItemName,
  StoriesContentCircleImgWrapper,
  StoriesContentCircleImg,
  StoriesContentButton,
  CreatePostButton,
} from './styled/UserMenu.styled';
import {MAX_STORIES_NUMBER} from '../constants';
import {useAuth, useMounted} from '../hooks';
import {onErrorMedia} from '../utils/media';
import {kFormatter, socialLinkFormatter} from '../utils/formatters';
import {getStoryCategoriesByUid} from '../services/firestore';

const UserMenu = () => {
  const [storyCategories, setStoryCategories] = useState([]);

  const auth = useAuth();

  const mounted = useMounted();

  useEffect(() => {
    const getCurrentUserStoryCategories = async () => {
      const storyCategoriesData = await getStoryCategoriesByUid();

      if (mounted.current) {
        setStoryCategories(storyCategoriesData);
      }
    };

    getCurrentUserStoryCategories();
  }, [auth.authUser.id, mounted]);

  return (
    <StyledUserMenu>
      <UserMenuTopContent>
        <ThumbnailContentAvatar
          url={auth.authUser.avatar}
          hasStory={auth.authUser.hasStory}
          hasStoryBeenSeen={auth.authUser.hasStoryBeenSeen}
        />
        <ThumbnailContentUserName>
          {auth.authUser.username}
        </ThumbnailContentUserName>
        <ThumbnailContentJobDescription>
          {auth.authUser.job}
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
              auth.authUser.numberOfPosts,
              auth.authUser.numberOfFollowers,
              auth.authUser.numberOfFollowingUsers,
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
                <Fragment key={index}>
                  <StatisticItem>
                    <StatisticNumber>{kFormatter(field)}</StatisticNumber>
                    <StatisticName>Posts</StatisticName>
                  </StatisticItem>
                  <StatisticalContentInnerDot />
                </Fragment>
              );
            })}
          </StatisticalContentInner>
        </StatisticalContent>
        <BioContentContainer>
          <SectionTitle>{auth.authUser.name}</SectionTitle>
          <BioContent
            showChar={49}
            readMoreText="(Read more)"
            showLessText="(Show less)"
            readMoreLink="https://www.instagram.com/phuc7320/"
          >
            {auth.authUser.bio}
          </BioContent>
          {auth.authUser.socialLinks.length > 0 ? (
            <BioContentSocialLinks>
              {auth.authUser.socialLinks.slice(0, 3).map((link, index) => (
                <BioContentSocialLink key={index} href={link}>
                  {socialLinkFormatter(link)}
                </BioContentSocialLink>
              ))}
            </BioContentSocialLinks>
          ) : (
            <BioContentNoSocialLinks>No social links</BioContentNoSocialLinks>
          )}
        </BioContentContainer>
      </UserMenuMiddleContent>
      <UserMenuBottomContent>
        <StoriesContent>
          <SectionTitle>Your Stories</SectionTitle>
          {storyCategories.length > 0 ? (
            <StoriesContentStoryList>
              {storyCategories
                .map((story) => (
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
                    <StoriesContentButton
                      size="large"
                      shape="circle"
                      icon={<PlayIcon />}
                      disabledHover
                    />
                    <StoriesContentStoryItemName>
                      Play All
                    </StoriesContentStoryItemName>
                  </StoriesContentStoryItem>
                )}
            </StoriesContentStoryList>
          ) : (
            <StoriesContentStoryItem as="div">
              <StoriesContentButton
                size="large"
                shape="circle"
                icon={<PlusIcon />}
                disabledHover
              />
              <StoriesContentStoryItemName>Add</StoriesContentStoryItemName>
            </StoriesContentStoryItem>
          )}
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
