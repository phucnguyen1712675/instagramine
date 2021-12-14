import {useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {PATHS, MAX_LENGTH_PASSWORD} from '../constants';
import {useAuth} from '../hooks/useAuth';
import {useForm} from '../hooks/useForm';
import AuthLayout from '../components/AuthLayout';
import HideLabel from '../components/HideLabel';
import Button from '../components/Button';
import {
  Logo,
  AuthForm,
  AuthInput,
  PasswordAuthInput,
  ErrorText,
  SubmitButtonWrapper,
} from '../components/styled/Lib';

const LoginPage = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const auth = useAuth();

  const from = location.state?.from?.pathname || '/';

  const [isLoading, setIsLoading] = useState(false);

  const {values, errors, handleChange, handleSubmit} = useForm({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      setIsLoading(true);

      setTimeout(() => {
        auth.signIn(
          {
            username: values.username,
          },
          () => {
            navigate(from, {replace: true});
          }
        );

        setIsLoading(false);
      }, 1000);
    },
    validate: (values) => {
      const errors = {};

      if (!values.username) {
        errors.username = 'Please enter username';
      }

      if (!values.password) {
        errors.password = 'Please enter password';
      } else if (password.length < MAX_LENGTH_PASSWORD) {
        errors.password = `Password must be at least ${MAX_LENGTH_PASSWORD} characters`;
      }

      return errors;
    },
  });

  const {username, password} = values;

  const disableSubmitButton = isLoading || !username || !password;

  return (
    <AuthLayout
      questionText="Don't have an account? "
      toUrl={`/${PATHS.SIGNUP_PAGE}`}
      toPageText="Sign up"
    >
      <Logo />
      <AuthForm onSubmit={handleSubmit}>
        <HideLabel htmlFor="login_username">Username</HideLabel>
        <AuthInput
          id="login_username"
          name="username"
          placeholder="Username"
          value={username}
          onChange={handleChange}
        />
        {errors.username && <ErrorText>{errors.username}</ErrorText>}
        <HideLabel htmlFor="login_password">Password</HideLabel>
        <PasswordAuthInput
          id="login_password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
        />
        {errors.password && <ErrorText>{errors.password}</ErrorText>}
        <SubmitButtonWrapper $disabled={disableSubmitButton}>
          <Button
            htmlType="submit"
            type="primary"
            size="large"
            block
            loading={isLoading}
            disabled={disableSubmitButton}
          >
            Login
          </Button>
        </SubmitButtonWrapper>
      </AuthForm>
    </AuthLayout>
  );
};

export default LoginPage;
