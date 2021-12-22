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
import {
  GuideText,
  TermAndPolicyText,
  TextAndPolicyLink,
} from '../components/styled/SignUpPage.styled';

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
    onSubmit: async (values) => {
      setIsLoading(true);

      const isSuccess = await auth.register({
        email: values.email,
        fullName: values.fullName,
        username: values.username,
        password: values.password,
      });

      setIsLoading(false);

      if (isSuccess) {
        navigate(from, {replace: true});
      }
    },
    validate: (values) => {
      const errors = {};

      if (!values.email) {
        errors.email = 'Please enter email';
      } else if (!validateEmail(values.email)) {
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
      } else if (values.password.length < MAX_LENGTH_PASSWORD) {
        errors.password = `Password must be at least ${MAX_LENGTH_PASSWORD} characters`;
      }

      if (values.confirmPassword !== values.password) {
        errors.confirmPassword = 'Confirm password not matched!';
      }

      return errors;
    },
  });

  const disableSubmitButton =
    isLoading ||
    !values.email ||
    !values.fullName ||
    !values.username ||
    !values.password ||
    !values.confirmPassword;

  return (
    <AuthLayout
      questionText="Have an account? "
      toUrl={`/${PATHS.LOGIN}`}
      toPageText="Login"
    >
      <Logo />
      <GuideText>Sign up to see photos and videos from your friends.</GuideText>
      <AuthForm onSubmit={handleSubmit}>
        <HideLabel htmlFor="signup_email">Email</HideLabel>
        <EmailAuthInput
          id="signup_email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && <ErrorText>{errors.email}</ErrorText>}
        <HideLabel htmlFor="signup_full_name">Full name</HideLabel>
        <AuthInput
          id="signup_full_name"
          name="fullName"
          placeholder="Full Name"
          value={values.fullName}
          onChange={handleChange}
        />
        {errors.fullName && <ErrorText>{errors.fullName}</ErrorText>}
        <HideLabel htmlFor="signup_username">Username</HideLabel>
        <AuthInput
          id="signup_username"
          name="username"
          placeholder="Username"
          value={values.username}
          onChange={handleChange}
        />
        {errors.username && <ErrorText>{errors.username}</ErrorText>}
        <HideLabel htmlFor="signup_password">Password</HideLabel>
        <PasswordAuthInput
          id="signup_password"
          name="password"
          placeholder="Password"
          value={values.password}
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
          value={values.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && (
          <ErrorText>{errors.confirmPassword}</ErrorText>
        )}
        <SubmitButtonWrapper $disabled={disableSubmitButton}>
          <Button
            block
            htmlType="submit"
            type="primary"
            size="large"
            loading={isLoading}
            disabled={disableSubmitButton}
          >
            Sign up
          </Button>
        </SubmitButtonWrapper>
        <TermAndPolicyText>
          By signing up, you agree to our{' '}
          <TextAndPolicyLink
            target="_blank"
            rel="noopener noreferrer"
            href="https://help.instagram.com/581066165581870"
          >
            Terms
          </TextAndPolicyLink>{' '}
          and{' '}
          <TextAndPolicyLink
            target="_blank"
            rel="noopener noreferrer"
            href="https://help.instagram.com/519522125107875"
          >
            Data Policy
          </TextAndPolicyLink>{' '}
          and{' '}
          <TextAndPolicyLink
            target="_blank"
            rel="noopener noreferrer"
            href="https://help.instagram.com/1896641480634370?ref=ig"
          >
            Cookies Policy
          </TextAndPolicyLink>
          .
        </TermAndPolicyText>
      </AuthForm>
    </AuthLayout>
  );
};

export default SignUpPage;
