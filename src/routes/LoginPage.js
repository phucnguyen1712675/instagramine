import React from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {VisuallyHidden} from '../components/styled/Lib';
import {
  StyledLoginPage,
  LoginPageInner,
  LoginFormWrapper,
  Logo,
  LoginForm,
  UsernameInput,
  PasswordInput,
  SubmitButtonWrapper,
  SubmitButton,
  SignUpWrapper,
} from '../components/styled/LoginPage.styled';
import {useAuth} from '../hooks/useAuth';
import {useForm} from '../hooks/useForm';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const from = location.state?.from?.pathname || '/';

  const {values, handleChange, handleSubmit} = useForm({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      const {username} = values;

      auth.signIn(username, () => {
        navigate(from, {replace: true});
      });
    },
    validate(values) {
      const errors = {};

      if (values.username === '') {
        errors.username = 'Please enter username';
      }

      if (values.password === '') {
        errors.password = 'Please enter password';
      } else if (values.password.length < 6) {
        errors.password = 'Password must be at least 6 characters long';
      }

      return errors;
    },
  });

  const {username, password} = values;

  return (
    <StyledLoginPage>
      <LoginPageInner>
        <LoginFormWrapper>
          <Logo />
          <LoginForm onSubmit={handleSubmit}>
            <label htmlFor="login_username">
              <VisuallyHidden>Username</VisuallyHidden>
            </label>
            <UsernameInput
              id="login_username"
              name="username"
              placeholder="Username"
              value={username}
              onChange={handleChange}
            />
            <label htmlFor="login_password">
              <VisuallyHidden>Password</VisuallyHidden>
            </label>
            <PasswordInput
              id="login_password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleChange}
            />
            <SubmitButtonWrapper>
              <SubmitButton htmlType="submit" type="primary" size="large" block>
                Login
              </SubmitButton>
            </SubmitButtonWrapper>
          </LoginForm>
        </LoginFormWrapper>
        <SignUpWrapper></SignUpWrapper>
      </LoginPageInner>
    </StyledLoginPage>
  );
};

export default LoginPage;
