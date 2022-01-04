import {useReducer, useEffect} from 'react';
import {useAuth, useMounted} from '../hooks';
import {PostList} from '../components';
import {savedContentReducer} from '../reducers';
import {getSavedPostsByUid} from '../services/firestore';
import {
  SET_IS_LOADING,
  SET_SAVED_POSTS_AFTER_LOADING,
} from '../actions/savedContentActions';
import {PageContent} from '../components/styled/Lib';
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

      const savedPostsData = await getSavedPostsByUid(auth.authUser.id);

      if (mounted.current) {
        dispatch({
          type: SET_SAVED_POSTS_AFTER_LOADING,
          payload: savedPostsData,
        });
      }
    };

    getSavedPosts();
  }, [auth.authUser.id, mounted]);

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

  return <PostList posts={state.savedPosts} />;
};

export default SavedContent;
