import styled from 'styled-components';
import {flexCenter} from './Mixins';

export const StyledSidebar = styled.aside`
  grid-area: sidebar;
  ${flexCenter({direction: 'column'})};
  background-color: ${({theme}) => theme.colors.bgComponentLightTheme};
  position: relative;
  border: 1px solid ${({theme}) => theme.colors.borderSidebar};
`;

export const Nav = styled.nav`
  ${flexCenter({horizontally: false, direction: 'column'})};
  justify-content: stretch;
  row-gap: 4rem;
`;

export const SettingButtonWrapper = styled.div`
  position: absolute;
  bottom: 34px;
`;

// !Note: Maybe do later
// export const AdditionalRectangle = styled.div`
//   --size-rectangle: 10px;
//   --width-border: 1px;
//   content: '';
//   position: absolute;
//   width: var(--size-rectangle);
//   height: 150px;
//   right: calc(-1 * var(--size-rectangle));
//   background-color: #fff;
//   top: 50%;
//   transform: translateY(-50%);
//   z-index: 1;
//   border: var(--width-border) solid ${({theme}) => theme.colors.border};
//   border-left-color: transparent;
//   border-radius: 100px;
// `;
