import styled from 'styled-components';

export const StyledHeader = styled.header`
  grid-area: header;
  display: flex;
	align-items: center;
  justify-content: space-between;
  background-color: ${({theme}) => theme.colors.bgComponentLightTheme};
  padding: 0 20px;
  border-bottom: 1px solid ${({theme}) => theme.colors.primaryBorder};
  box-shadow: 0px 10px 40px rgba(231, 237, 243, 0.4);
`;

export const AppLogo = styled.a`
  display: flex;
	align-items: center;
  column-gap: 8px;
  cursor: pointer;
	outline: none;

  svg:first-child {
    font-size: 2.8rem;
  }
`;
