import {useState, useEffect, Fragment} from 'react';
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from 'firebase/firestore';
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
import {db} from '../firebase-config';
import {onErrorMedia} from '../utils/media';
import {getCollectionData} from '../utils/firestore';

const kFormatter = (num) =>
  Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'K'
    : Math.sign(num) * Math.abs(num);

const socialLinkFormatter = (socialLink) =>
  socialLink.replace('https://', 'www.');

const UserMenu = () => {
  const [storyCategories, setStoryCategories] = useState([]);

  const auth = useAuth();

  const mounted = useMounted();

  useEffect(() => {
    const getCurrentUserStoryCategories = async () => {
      try {
        const junctionsQuerySnap = await getDocs(
          query(
            collection(db, 'junction_user_story_category'),
            where('uid', '==', auth.uid),
            orderBy('views', 'desc'),
            limit(MAX_STORIES_NUMBER)
          )
        );

        if (junctionsQuerySnap.docs.length > 0) {
          const storyCategoriesSnaps = await Promise.all(
            junctionsQuerySnap.docs
              .filter((document) => document.exists())
              .map((document) =>
                getDoc(
                  doc(db, `story_categories/${document.data().storyCategoryId}`)
                )
              )
          );

          const currentUserStoryCategories =
            getCollectionData(storyCategoriesSnaps);

          if (mounted.current) {
            setStoryCategories(currentUserStoryCategories);
          }
        }
      } catch (error) {
        alert(`Error: ${error.message}`);
      }
    };

    getCurrentUserStoryCategories();
  }, [auth.uid, mounted]);

  return (
    <StyledUserMenu>
      <UserMenuTopContent>
        <ThumbnailContentAvatar
          url={auth.currentUser.avatar}
          hasStory={auth.currentUser.hasStory}
          hasStoryBeenSeen={auth.currentUser.hasStoryBeenSeen}
        />
        <ThumbnailContentUserName>
          {auth.currentUser.username}
        </ThumbnailContentUserName>
        <ThumbnailContentJobDescription>
          {auth.currentUser.job}
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
              auth.currentUser.numberOfPosts,
              auth.currentUser.numberOfFollowers,
              auth.currentUser.numberOfFollowingUsers,
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
          <SectionTitle>{auth.currentUser.name}</SectionTitle>
          <BioContent
            showChar={49}
            readMoreText="(Read more)"
            showLessText="(Show less)"
            readMoreLink="https://www.instagram.com/phuc7320/"
          >
            {auth.currentUser.bio}
          </BioContent>
          {auth.currentUser.socialLinks.length > 0 ? (
            <BioContentSocialLinks>
              {auth.currentUser.socialLinks.slice(0, 3).map((link, index) => (
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
