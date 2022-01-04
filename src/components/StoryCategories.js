import {useReducer, useEffect} from 'react';
import {PlayIcon, PlusIcon} from './icons';
import {UserMenuSectionTitle} from './styled/Lib';
import {
  StyledStoryCategories,
  StyledStoryCategoriesWhileLoading,
  StoryCategoriesSpinner,
  StoriesContentStoryList,
  StoriesContentStoryItem,
  StoriesContentAddButton,
  StoriesContentStoryItemInner,
  StoriesContentStoryItemName,
  StoriesContentCircleImgWrapper,
  StoriesContentCircleImg,
  StoriesContentButton,
} from './styled/StoryCategories.styled';
import {useAuth, useMounted} from '../hooks';
import {userMenuReducer} from '../reducers';
import {onErrorMedia} from '../utils/media';
import {getStoryCategoriesByUid} from '../services/firestore';
import {
  SET_IS_LOADING,
  SET_STORY_CATEGORIES_AFTER_LOADING,
} from '../actions/userMenuActions';

const StoryCategories = () => {
  const [state, dispatch] = useReducer(userMenuReducer, {
    isLoading: false,
    storyCategories: [],
  });

  const auth = useAuth();

  const mounted = useMounted();

  useEffect(() => {
    const getStoryCategories = async () => {
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

    getStoryCategories();
  }, [auth.authUser.id, mounted]);

  if (state.isLoading) {
    return (
      <StyledStoryCategoriesWhileLoading>
        <StoryCategoriesSpinner />
      </StyledStoryCategoriesWhileLoading>
    );
  }

  return (
    <StyledStoryCategories>
      <UserMenuSectionTitle>Your Stories</UserMenuSectionTitle>
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
    </StyledStoryCategories>
  );
};

export default StoryCategories;
