import HomeIcon from './components/icons/HomeIcon';
import InboxIcon from './components/icons/InboxIcon';
import ExploreIcon from './components/icons/ExploreIcon';
import ActivityIcon from './components/icons/ActivityIcon';
import ReelIcon from './components/icons/ReelIcon';
import StreamIcon from './components/icons/StreamIcon';
import SavedListIcon from './components/icons/SavedListIcon';

export const NAV_ICONS = [
  {
    id: 0,
    icon: <HomeIcon />,
    content: 'Home',
  },
  {
    id: 1,
    icon: <InboxIcon />,
    content: 'Inbox',
  },
  {
    id: 2,
    icon: <ExploreIcon />,
    content: 'Explore',
  },
  {
    id: 3,
    icon: <ActivityIcon />,
    content: 'Activity',
  },
  {
    id: 4,
    icon: <ReelIcon />,
    content: 'Reel',
  },
  {
    id: 5,
    icon: <StreamIcon />,
    content: 'Stream',
  },
  {
    id: 6,
    icon: <SavedListIcon />,
    content: 'Saved',
  },
];

export const ONERROR_IMAGE_PLACEHOLDER =
  'https://user-images.githubusercontent.com/47315479/81145216-7fbd8700-8f7e-11ea-9d49-bd5fb4a888f1.png';

export const ONERROR_VIDEO_PLACEHOLDER =
  'https://cdn.dribbble.com/users/17914/screenshots/4902225/media/76e60c9102f45d6a6a858f3d8edc2aff.png';

export const POST_CAPTION_SHOW_CHAR = 40;

export const MAX_SOCIAL_LINK_NUMBER = 3;

export const MAX_STORIES_NUMBER = 3;

export const MAX_CHARS_BIO_USER_MENU = 49;

export const PATHS = {
  LOGIN_PAGE: 'login',
  SIGNUP_PAGE: 'signup',
};
