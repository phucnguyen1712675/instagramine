import {useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {PATHS, MAX_LENGTH_PASSWORD} from '../constants';
import {validateEmail} from '../utils/validate';
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
  EmailAuthInput,
  ErrorText,
  SubmitButtonWrapper,
} from '../components/styled/Lib';

const SignUpPage = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const auth = useAuth();

  const from = location.state?.from?.pathname || '/';

  const [isLoading, setIsLoading] = useState(false);

  const {values, errors, handleChange, handleSubmit} = useForm({
    initialValues: {
      email: '',
      fullName: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: (values) => {
      setIsLoading(true);

      setTimeout(() => {
        auth.signUp(
          {
            email: values.email,
            fullName: values.fullName,
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

      if (!values.email) {
        errors.email = 'Please enter email';
      } else if (!validateEmail(email)) {
        errors.email = 'Please enter valid email';
      }

      if (!values.fullName) {
        errors.fullName = 'Please enter fullName';
      }

      if (!values.username) {
        errors.username = 'Please enter username';
      }

      if (!values.password) {
        errors.password = 'Please enter password';
      } else if (password.length < MAX_LENGTH_PASSWORD) {
        errors.password = `Password must be at least ${MAX_LENGTH_PASSWORD} characters`;
      }

      if (values.confirmPassword !== values.password) {
        errors.confirmPassword = 'Confirm password not matched!';
      }

      return errors;
    },
  });

  const {email, fullName, username, password, confirmPassword} = values;

  const disableSubmitButton =
    isLoading ||
    !email ||
    !fullName ||
    !username ||
    !password ||
    !confirmPassword;

  return (
    <AuthLayout
      questionText="Have an account? "
      toUrl={`/${PATHS.LOGIN_PAGE}`}
      toPageText="Login"
    >
      <Logo />
      <AuthForm onSubmit={handleSubmit}>
        <HideLabel htmlFor="signup_email">Email</HideLabel>
        <EmailAuthInput
          id="signup_email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
        />
        {errors.email && <ErrorText>{errors.email}</ErrorText>}
        <HideLabel htmlFor="signup_full_name">Full name</HideLabel>
        <AuthInput
          id="signup_full_name"
          name="fullName"
          placeholder="Full Name"
          value={fullName}
          onChange={handleChange}
        />
        {errors.fullName && <ErrorText>{errors.fullName}</ErrorText>}
        <HideLabel htmlFor="signup_username">Username</HideLabel>
        <AuthInput
          id="signup_username"
          name="username"
          placeholder="Username"
          value={username}
          onChange={handleChange}
        />
        {errors.username && <ErrorText>{errors.username}</ErrorText>}
        <HideLabel htmlFor="signup_password">Password</HideLabel>
        <PasswordAuthInput
          id="signup_password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
        />
        {errors.password && <ErrorText>{errors.password}</ErrorText>}
        <HideLabel htmlFor="signup_confirm_password">
          Confirm password
        </HideLabel>
        <PasswordAuthInput
          id="signup_confirm_password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && (
          <ErrorText>{errors.confirmPassword}</ErrorText>
        )}
        <SubmitButtonWrapper $disabled={disableSubmitButton}>
          <Button
            htmlType="submit"
            type="primary"
            size="large"
            block
            loading={isLoading}
            disabled={disableSubmitButton}
          >
            Sign up
          </Button>
        </SubmitButtonWrapper>
      </AuthForm>
    </AuthLayout>
  );
};

export default SignUpPage;
