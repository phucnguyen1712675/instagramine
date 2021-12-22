import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from 'react';
import SearchBar from './SearchBar';
import MenuIcon from './icons/MenuIcon';
import SearchIcon from './icons/SearchIcon';
import LeftArrow from './icons/LeftArrow';
import AudioIcon from './icons/AudioIcon';
import {
  StyledHeader,
  HeaderLeftItem,
  MenuButton,
  AppLogo,
  AppLogoIcon,
  AppLogoTextIcon,
  SearchButton,
  SearchHeaderButton,
} from './styled/Header.styled';
import {SIZES} from '../constants';
import {useWindowSize} from '../hooks/useWindowSize';
import {useOnScreen} from '../hooks/useOnScreen';

const Header = forwardRef((props, ref) => {
  const [isSearching, setIsSearching] = useState(false);

  const menuBtnRef = useRef(null);

  const isMenuBtnOnScreen = useOnScreen({ref: menuBtnRef});

  const windowSize = useWindowSize();

  const tabletSize = +SIZES.tablet.replace('px', '');

  const isOnMobile = windowSize.width < tabletSize;

  const isSearchHeader = isOnMobile && isSearching;

  useEffect(() => {
    if (!isOnMobile && isSearching) {
      setIsSearching(false);
    }
  }, [isOnMobile, isSearching]);

  useImperativeHandle(ref, () => ({
    isMenuBtnOnScreen,
  }));

 

  const toggleToSearchHeader = () => {
    setIsSearching(true);
  };

  const toggleToMainHeader = () => {
    setIsSearching(false);
  };

  return (
    <StyledHeader $isSearchHeader={isSearchHeader}>
      {!isSearching ? (
        <>
          <HeaderLeftItem>
            <MenuButton ref={menuBtnRef} htmlFor="toggle_sidebar_button">
              <MenuIcon />
            </MenuButton>
            <AppLogo to="/">
              <AppLogoIcon />
              <AppLogoTextIcon />
            </AppLogo>
          </HeaderLeftItem>
          <SearchButton onClick={toggleToSearchHeader}>
            <SearchIcon />
          </SearchButton>
          {!isOnMobile && <SearchBar />}
        </>
      ) : (
        <>
          <SearchHeaderButton
            type="text"
            onClick={toggleToMainHeader}
            disabledHover
          >
            <LeftArrow />
          </SearchHeaderButton>
          <SearchBar />
          <SearchHeaderButton type="text" disabledHover>
            <AudioIcon />
          </SearchHeaderButton>
        </>
      )}
    </StyledHeader>
  );
});

Header.displayName = 'Header';

export default Header;
