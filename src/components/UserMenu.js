import {useReducer, useEffect, Fragment} from 'react';
import NotificationButton from './NotificationButton';
import {PlayIcon, PlusIcon} from './icons';
import {
  StyledUserMenu,
  StyledUserMenuWhileLoading,
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
  StoriesContentAddButton,
  StoriesContentStoryItemInner,
  StoriesContentStoryItemName,
  StoriesContentCircleImgWrapper,
  StoriesContentCircleImg,
  StoriesContentButton,
  CreatePostButton,
} from './styled/UserMenu.styled';
import {useAuth, useMounted} from '../hooks';
import {userMenuReducer} from '../reducers';
import {onErrorMedia} from '../utils/media';
import {kFormatter, socialLinkFormatter} from '../utils/formatters';
import {getStoryCategoriesByUid} from '../services/firestore';
import {
  SET_IS_LOADING,
  SET_STORY_CATEGORIES_AFTER_LOADING,
} from '../actions/userMenuActions';

const UserMenu = () => {
  const [state, dispatch] = useReducer(userMenuReducer, {
    isLoading: false,
    storyCategories: [],
  });

  const auth = useAuth();

  const mounted = useMounted();

  useEffect(() => {
    const getCurrentUserStoryCategories = async () => {
      dispatch({type: SET_IS_LOADING, payload: true});

      const storyCategoriesData = await getStoryCategoriesByUid(
        auth.authUser.id
      );

      if (mounted.current) {
        dispatch({
          type: SET_STORY_CATEGORIES_AFTER_LOADING,
          payload: storyCategoriesData,
        });
      }
    };

    getCurrentUserStoryCategories();
  }, [auth.authUser.id, mounted]);

  if (state.isLoading) {
    return <StyledUserMenuWhileLoading>...Loading</StyledUserMenuWhileLoading>;
  }

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
          {state.storyCategories.length > 0 ? (
            <StoriesContentStoryList>
              {state.storyCategories
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
                  <StoriesContentStoryItem key="user_menu_add_story_icon">
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
            <StoriesContentAddButton as="div">
              <StoriesContentButton
                size="large"
                shape="circle"
                icon={<PlusIcon />}
                disabledHover
              />
              <StoriesContentStoryItemName>Add</StoriesContentStoryItemName>
            </StoriesContentAddButton>
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
