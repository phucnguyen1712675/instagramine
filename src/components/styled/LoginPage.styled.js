import styled, {css} from 'styled-components';
import {Input, DisabledButtonWrapper} from './Lib';
import Button from '../Button';
import LogoTextIcon from '../icons/LogoTextIcon';

export const StyledLoginPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  row-gap: 10px;
  height: 100vh;
`;

export const LoginPageInner = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  flex-direction: column;
  row-gap: 10px;
  flex-grow: 1;
  max-width: 350px;
`;

const ContainerStyle = styled.div`
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

export const LoginFormWrapper = styled(ContainerStyle)``;

export const Logo = styled(LogoTextIcon)`
  width: 175px;
  height: 51px;
  margin: 22px auto 12px;
`;

export const LoginForm = styled.form`
  display: flex;
  align-items: stretch;
  justify-content: center;
  flex-direction: column;
  flex-shrink: 0;
  width: 100%;
  margin: 24px 0;
`;

const LoginInput = styled(Input)`
  margin: 0 40px 12px;
  outline: 1px solid rgba(175, 193, 217, 0.5);
`;

export const UsernameInput = styled(LoginInput)``;

export const PasswordInput = styled(LoginInput).attrs({
  type: 'password',
})``;

export const SubmitButtonWrapper = styled(DisabledButtonWrapper)`
  margin: 6px 40px;
`;

export const SubmitButton = styled(Button)`
  font-size: 1.4rem;
`;

export const SignUpWrapper = styled(ContainerStyle)``;
