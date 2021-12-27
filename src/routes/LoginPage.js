import {useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {AuthErrorCodes, signInWithEmailAndPassword} from 'firebase/auth';
import {PATHS, MAX_LENGTH_PASSWORD} from '../constants';
import {useAuth, useForm, useMounted} from '../hooks';
import {AuthLayout, HideLabel, Button} from '../components';
import {auth} from '../firebase-config';
import {validateEmail} from '../utils/validate';
import {
  Logo,
  AuthForm,
  AuthInput,
  PasswordAuthInput,
  ErrorText,
  SubmitButtonWrapper,
} from '../components/styled/Lib';

const findLoginError = (code) => {
  switch (code) {
    case AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER:
      return 'Too many attempts. Try again later.';
    case AuthErrorCodes.USER_DELETED:
    case AuthErrorCodes.INVALID_EMAIL:
    case AuthErrorCodes.INVALID_PASSWORD:
      return 'Invalid email or password';
    default:
      return 'Something went wrong';
  }
};

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();

  const from = location.state?.from?.pathname ?? '/';

  const {setCurrentUserUid} = useAuth();

  const mounted = useMounted();

  const {values, errors, handleChange, handleSubmit} = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        setIsLoading(true);

        const userCredential = await signInWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );

        const {user} = userCredential;

        setCurrentUserUid(user.uid);

        navigate(from, {replace: true});
      } catch (error) {
        if (mounted.current) {
          setIsLoading(false);
        }

        const errorMessage = findLoginError(error.code);
        alert(errorMessage);
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
