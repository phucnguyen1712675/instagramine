import {useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {PATHS, MAX_LENGTH_PASSWORD} from '../constants';
import {useAuth, useForm} from '../hooks';
import {AuthLayout, HideLabel, Button} from '../components';
import {validateEmail} from '../utils/validate';
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

  const from = location.state?.from?.pathname ?? '/';

  const auth = useAuth();

  useEffect(() => {
    if (!auth.isLoading && auth.error) {
      alert(auth.error);
    }
  }, [auth.isLoading, auth.error]);

  const {values, errors, handleChange, handleSubmit} = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      const isSuccess = await auth.logIn({
        email: values.email,
        password: values.password,
      });

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

      if (!values.password) {
        errors.password = 'Please enter password';
      } else if (values.password.length < MAX_LENGTH_PASSWORD) {
        errors.password = `Password must be at least ${MAX_LENGTH_PASSWORD} characters`;
      }

      return errors;
    },
  });

  const disableSubmitButton =
    auth.isLoading || !values.email || !values.password;

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
            loading={auth.isLoading}
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
