import {StyledHeader, AppLogo} from './styled/Header.styled';
import SearchForm from './SearchForm';
import LogoIcon from './icons/LogoIcon';
import LogoTextIcon from './icons/LogoTextIcon';

const Header = () => {
  return (
    <StyledHeader>
      <AppLogo href="#">
        <LogoIcon />
        <LogoTextIcon />
      </AppLogo>
      <SearchForm />
    </StyledHeader>
  );
};

export default Header;
