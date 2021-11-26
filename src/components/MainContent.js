import {useReducer} from 'react';
import Post from './Post';
import {StyledMainContent, PostWrapper} from './styled/MainContent.styled';
import postsData from '../data/posts.json';

const contentReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_POST':
      return [...state, action.payload];
    default:
      return state;
  }
};

const MainContent = () => {
  const [posts, dispatch] = useReducer(contentReducer, postsData);
  console.log(dispatch);

  const postsContent = posts.map((post) => <Post key={post.id} post={post} />);

  return (
    <StyledMainContent>
      <PostWrapper>{postsContent}</PostWrapper>
    </StyledMainContent>
  );
};

export default MainContent;
