import {useReducer, createContext} from 'react';
import PropTypes from 'prop-types';
import AppReducer from '../reducers/app-reducer';

const initialState = {
  currentUser: {
    username: 'nkchaudhary01',
    name: 'Neelesh Chaudhary',
    avatar:
      'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80',
    job: 'Wildlife Photographer',
    postsNumber: 98,
    followersNumber: 3500,
    followingNumber: 900,
    bio: 'My specialty lies in creating colorful creations, amazing designs, and high-quality website artworks that have the potential to capture the attention while making a very positive first impression on the visitor visitor visitor visitor visitor',
    hasStory: true,
    hasStoryBeenSeen: true,
    socialLinks: ['https://dribbble.com/nkchaudhary01'],
    storiesCategory: [
      {
        id: 0,
        name: 'Featured',
        thumbnail:
          'https://images.unsplash.com/photo-1620834073708-477e0bbc5a8e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
      },
      {
        id: 1,
        name: 'India',
        thumbnail:
          'https://images.unsplash.com/photo-1532664189809-02133fee698d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=435&q=80',
      },
      {
        id: 2,
        name: 'Paris',
        thumbnail:
          'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80',
      },
      {
        id: 3,
        name: 'Food',
        thumbnail:
          'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80',
      },
      {
        id: 4,
        name: 'Hooman',
        thumbnail:
          'https://images.unsplash.com/photo-1611721489273-c37c29e70814?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1964&q=80',
      },
      {
        id: 5,
        name: 'Travel',
        thumbnail:
          'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
      },
    ],
  },
};

const GlobalContext = createContext(initialState);

export const GlobalContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const signIn = (username, password) =>
    dispatch({type: 'SIGN_IN', payload: {username, password}});

  const context = {
    currentUser: state.currentUser,
    signIn,
  };

  return (
    <GlobalContext.Provider value={context}>{children}</GlobalContext.Provider>
  );
};

GlobalContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalContext;
