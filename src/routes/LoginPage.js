import {useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {AuthErrorCodes} from 'firebase/auth';
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
  ErrorText,
  SubmitButtonWrapper,
} from '../components/styled/Lib';

const LoginPage = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const auth = useAuth();

  const from = location.state?.from?.pathname || '/';

  const [isLoading, setIsLoading] = useState(false);

  const findError = (error) => {
    switch (error.code) {
      case AuthErrorCodes.USER_DELETED:
        return 'Invalid email or password';
      default:
        return 'Something went wrong';
    }
  };

  const {values, errors, handleChange, handleSubmit} = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      setIsLoading(true);

      const result = await auth.logIn({
        email: values.email,
        password: values.password,
      });

      setIsLoading(false);

      if (!result.hasError) {
        navigate(from, {replace: true});
      } else {
        let message = findError(result.error);
        alert(message);
      }
    },
    validate: (values) => {
      const errors = {};

      if (!values.email) {
        errors.email = 'Please enter email';
      } else if (!validateEmail(values.email)) {
        errors.email = 'Please enter valid email';
      }

      if (!values.password) {
        errors.password = 'Please enter password';
      } else if (values.password.length < MAX_LENGTH_PASSWORD) {
        errors.password = `Password must be at least ${MAX_LENGTH_PASSWORD} characters`;
      }

      return errors;
    },
  });

  const disableSubmitButton = isLoading || !values.email || !values.password;

  return (
    <AuthLayout
      questionText="Don't have an account? "
      toUrl={`/${PATHS.SIGNUP}`}
      toPageText="Sign up"
    >
      <Logo />
      <AuthForm onSubmit={handleSubmit}>
        <HideLabel htmlFor="login_email">Email</HideLabel>
        <AuthInput
          id="login_email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && <ErrorText>{errors.email}</ErrorText>}
        <HideLabel htmlFor="login_password">Password</HideLabel>
        <PasswordAuthInput
          id="login_password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
        />
        {errors.password && <ErrorText>{errors.password}</ErrorText>}
        <SubmitButtonWrapper $disabled={disableSubmitButton}>
          <Button
            block
            htmlType="submit"
            type="primary"
            size="large"
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
