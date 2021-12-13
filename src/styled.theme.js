const COLORS = {
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

const DEVICES = {
  mobileS: `(min-width: ${SIZES.mobileS})`,
  mobileM: `(min-width: ${SIZES.mobileM})`,
  mobileL: `(min-width: ${SIZES.mobileL})`,
  tablet: `(min-width: ${SIZES.tablet})`,
  laptop: `(min-width: ${SIZES.laptop})`,
  laptopL: `(min-width: ${SIZES.laptopL})`,
  desktop: `(min-width: ${SIZES.desktop})`,
  desktopL: `(min-width: ${SIZES.desktop})`,
};

const theme = {
  colors: COLORS,
  devices: DEVICES,
};

export default theme;
