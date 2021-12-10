import HomeIcon from './components/icons/HomeIcon';
import InboxIcon from './components/icons/InboxIcon';
import ExploreIcon from './components/icons/ExploreIcon';
import ActivityIcon from './components/icons/ActivityIcon';
import ReelIcon from './components/icons/ReelIcon';
import StreamIcon from './components/icons/StreamIcon';
import SavedListIcon from './components/icons/SavedListIcon';

export const COLORS = {
  bgApp: '#fbfcfd',
  bgComponentLightTheme: '#fff',
  borderBlue: '#F0F6FD',
  borderDarkBlue: '#EBF1FB',
  borderGray: '#dbdbdb',
  borderSeenStory: '#E5E5E5',
  blueAlphaAction: '#afc1d9',
  link: '#338DF6',
  primary: '#1B1D28',
  secondary: '#76777E',
  postAction: '#D7E0EB',
  likedButton: '#f0304e',
  danger: '#f0304e',
};

const SIZES = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px',
};

export const DEVICES = {
  mobileS: `(min-width: ${SIZES.mobileS})`,
  mobileM: `(min-width: ${SIZES.mobileM})`,
  mobileL: `(min-width: ${SIZES.mobileL})`,
  tablet: `(min-width: ${SIZES.tablet})`,
  laptop: `(min-width: ${SIZES.laptop})`,
  laptopL: `(min-width: ${SIZES.laptopL})`,
  desktop: `(min-width: ${SIZES.desktop})`,
  desktopL: `(min-width: ${SIZES.desktop})`,
};

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

export const LOADING_DELAY = 1000; // 1s

export const MAX_SOCIAL_LINK_NUMBER = 3;

export const MAX_STORIES_NUMBER = 3;

export const MAX_CHARS_BIO_USER_MENU = 49;
