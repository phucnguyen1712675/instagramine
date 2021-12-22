import styled, {css} from 'styled-components';
import {Link} from 'react-router-dom';
import {buttonColorHover} from './Mixins';
import Button from '../Button';
import LogoIcon from '../icons/LogoIcon';
import LogoTextIcon from '../icons/LogoTextIcon';
import {DEVICES} from '../../constants';

export const StyledHeader = styled.header`
  height: var(--height-header);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0px 10px 40px rgba(231, 237, 243, 0.4);
  z-index: 1;
  ${({theme}) => css`
    background-color: ${theme.colors.bgComponentLightTheme};
    border-bottom: 1px solid ${theme.colors.borderBlue};
  `};

  ${({$isSearchHeader}) =>
    $isSearchHeader
      ? css`
          column-gap: 6px;
        `
      : css`
          justify-content: space-between;
        `}

  @media ${DEVICES.laptop} {
    height: unset;
    position: unset;
    top: unset;
    left: unset;
    right: unset;
    grid-area: header;
  }
`;

export const HeaderLeftItem = styled.div`
  display: flex;
  align-items: center;
  column-gap: 16px;
`;

export const MenuButton = styled.label`
  cursor: pointer;
  padding: 8px;
  border-radius: 5px;
  ${({theme}) => css`
    color: ${theme.colors.secondary};
    border: 1px solid ${theme.colors.secondary};
  `};
  ${buttonColorHover};
  display: flex;

  @media ${DEVICES.laptop} {
    display: none;
  }
`;

export const AppLogo = styled(Link)`
  display: flex;
  align-items: center;
  column-gap: 8px;
  cursor: pointer;
  outline: none;
  padding: 2px;

  @media ${DEVICES.tablet} {
    padding: unset;
  }
`;

export const AppLogoIcon = styled(LogoIcon)`
  font-size: 2.8rem;
`;

export const AppLogoTextIcon = styled(LogoTextIcon)`
  display: none;

  @media ${DEVICES.mobileL} {
    display: inline-block;
  }
`;

export const SearchButton = styled(Button)`
  display: inline-block;
  font-size: 1.6rem;
  padding: 12px;
  border-radius: 5px;
  border: unset;
  ${({theme}) => css`
    background-color: ${theme.colors.blueAlphaBackground};

    &:hover {
      outline: 1px solid ${theme.colors.blueAlpha};
    }
  `};

  @media ${DEVICES.tablet} {
    display: none;
  }
`;

export const SearchHeaderButton = styled(Button)`
  flex-shrink: 0;
  padding: 0.8rem;
  font-size: 2.4rem;
  transition: background-color 0.2s ease-out;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

// export const BackButton = styled(Button)``;
