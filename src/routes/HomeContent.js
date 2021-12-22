import {useState, useEffect} from 'react';
import PostList from '../components/PostList';
import {PageContent} from '../components/styled/Lib';
import {HomeContentSpinner} from '../components/styled/HomeContent.styled';
import postsData from '../data/posts.json';

const HomeContent = () => {
  const [isLoading, setIsLoading] = useState(true);

  const posts = postsData;

  const hasPosts = posts.length > 0;

  useEffect(() => {
    let timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  if (isLoading) {
    return (
      <PageContent>
        <HomeContentSpinner />
      </PageContent>
    );
  }

  if (!hasPosts) {
    <PageContent>
      <p>No Posts.</p>
    </PageContent>;
  }

  return <PostList posts={postsData} />;
};

export default HomeContent;
