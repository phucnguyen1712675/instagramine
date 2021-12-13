import React from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {PATHS} from '../constants';
import AuthLayout from '../components/AuthLayout';
import HideLabel from '../components/HideLabel';
import {useAuth} from '../hooks/useAuth';
import {useForm} from '../hooks/useForm';
import {
  AuthInput,
  PasswordAuthInput,
  SubmitButtonWrapper,
  SubmitButton,
} from '../components/styled/Lib';

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
    validate: (values) => {
      const errors = {};

      if (!values.username) {
        errors.username = 'Please enter username';
      }

      if (!values.password) {
        errors.password = 'Please enter password';
      } else if (values.password.length < 6) {
        errors.password = 'Password must be at least 6 characters long';
      }

      return errors;
    },
  });

  const {username, password} = values;

  return (
    <AuthLayout
      onSubmit={handleSubmit}
      questionText="Don\'t have an account? "
      toUrl={`/${PATHS.SIGNUP_PAGE}`}
      toPageText="Sign up"
    >
      <HideLabel htmlFor="login_username">Username</HideLabel>
      <AuthInput
        id="login_username"
        name="username"
        placeholder="Username"
        value={username}
        onChange={handleChange}
      />
      <HideLabel htmlFor="login_password">Password</HideLabel>
      <PasswordAuthInput
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
    </AuthLayout>
  );
};

export default LoginPage;
