import {StyledHeader, AppLogo} from './styled/Header.styled';
import SearchBar from './SearchBar';
import LogoIcon from './icons/LogoIcon';
import LogoTextIcon from './icons/LogoTextIcon';

const Header = () => {
  return (
    <StyledHeader>
      <AppLogo href="#">
        <LogoIcon />
        <LogoTextIcon />
      </AppLogo>
      <SearchBar />
    </StyledHeader>
  );
};

export default Header;
