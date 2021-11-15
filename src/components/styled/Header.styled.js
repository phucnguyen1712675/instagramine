import styled from 'styled-components';
import {flexCenter} from './Mixins';

export const StyledHeader = styled.header`
  grid-area: header;
  ${flexCenter({horizontally: false})}
  background-color: ${({theme}) => theme.colors.bgComponentLightTheme};
  padding: 0 20px;
  justify-content: space-between;
  border-bottom: 1px solid ${({theme}) => theme.colors.borderSidebar};
  box-shadow: 0px 10px 40px rgba(231, 237, 243, 0.4);
`;

export const AppLogo = styled.a`
  ${flexCenter({horizontally: false})}
  column-gap: 8px;
  cursor: pointer;
`;
