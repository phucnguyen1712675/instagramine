import {useReducer, useEffect} from 'react';
import {homeContentReducer} from '../reducers';
import {useAuth, useMounted} from '../hooks';
import {Post} from '../components';
import {getPostsAtHomeContent} from '../services/firestore';
import {PageContent, PostList} from '../components/styled/Lib';
import {HomeContentSpinner} from '../components/styled/HomeContent.styled';
import {
  SET_IS_LOADING,
  SET_POSTS_AFTER_LOADING,
} from '../actions/homeContentActions';

const HomeContent = () => {
  const [state, dispatch] = useReducer(homeContentReducer, {
    isLoading: false,
    posts: [],
  });

  const auth = useAuth();

  const mounted = useMounted();

  useEffect(() => {
    const getPosts = async () => {
      dispatch({
        type: SET_IS_LOADING,
        payload: true,
      });

      const postsData = await getPostsAtHomeContent(auth.authUser.id);

      if (mounted.current) {
        dispatch({
          type: SET_POSTS_AFTER_LOADING,
          payload: postsData,
        });
      }
    };

    getPosts();
  }, [auth.authUser.id, mounted]);

  if (state.isLoading) {
    return (
      <PageContent>
        <HomeContentSpinner />
      </PageContent>
    );
  }

  if (state.posts.length <= 0) {
    return (
      <PageContent>
        <p>No Posts.</p>
      </PageContent>
    );
  }

  return (
    <PostList $postLength={state.posts.length}>
      {state.posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </PostList>
  );
};

export default HomeContent;
