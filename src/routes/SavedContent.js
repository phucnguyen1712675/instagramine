import {useReducer, useEffect} from 'react';
import {useAuth, useMounted} from '../hooks';
import {savedContentReducer} from '../reducers';
import {Post} from '../components';
import {getPostsAtSavedContent} from '../services/firestore';
import {
  SET_IS_LOADING,
  SET_SAVED_POSTS_AFTER_LOADING,
  UNSAVE_POST,
} from '../actions/savedContentActions';
import {PageContent, PostList} from '../components/styled/Lib';
import {SavedContentSpinner} from '../components/styled/SavedContent.styled';

const SavedContent = () => {
  const [state, dispatch] = useReducer(savedContentReducer, {
    isLoading: false,
    savedPosts: [],
  });

  const auth = useAuth();

  const mounted = useMounted();

  useEffect(() => {
    const getSavedPosts = async () => {
      dispatch({
        type: SET_IS_LOADING,
        payload: true,
      });

      const savedPostsData = await getPostsAtSavedContent(auth.authUser.id);

      if (mounted.current) {
        dispatch({
          type: SET_SAVED_POSTS_AFTER_LOADING,
          payload: savedPostsData,
        });
      }
    };

    getSavedPosts();
  }, [auth.authUser.id, mounted]);

  const removeSavedPostHandler = (postId) => {
    dispatch({
      type: UNSAVE_POST,
      payload: postId,
    });
  };

  if (state.isLoading) {
    return (
      <PageContent>
        <SavedContentSpinner />
      </PageContent>
    );
  }

  if (state.savedPosts.length <= 0) {
    return (
      <PageContent>
        <p>No Saved Posts.</p>
      </PageContent>
    );
  }

  return (
    <PostList $postLength={state.savedPosts.length}>
      {state.savedPosts.map((post) => (
        <Post
          key={post.id}
          post={post}
          removeSavedPostHandler={removeSavedPostHandler}
        />
      ))}
    </PostList>
  );
};

export default SavedContent;
