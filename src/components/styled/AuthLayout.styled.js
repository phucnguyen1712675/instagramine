import styled, {css} from 'styled-components';
import {Link} from 'react-router-dom';

export const StyledAuthLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  row-gap: 10px;
  min-height: 100vh;
`;

export const AuthLayoutInner = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  flex-direction: column;
  row-gap: 10px;
  flex-grow: 1;
  max-width: 350px;
`;

export const ContainerStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 10px 0;
  ${({theme}) => css`
    background-color: ${theme.colors.bgComponentLightTheme};
    border: 1px solid ${theme.colors.borderGray};
  `}
  border-radius: 5px;
`;

export const ChangeAuthPageText = styled.p`
  margin: 15px;
`;

export const ToUrlLink = styled(Link)`
  color: ${({theme}) => theme.colors.link};
  font-weight: 600;
`;
