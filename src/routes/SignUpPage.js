import {useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {AuthErrorCodes, createUserWithEmailAndPassword} from 'firebase/auth';
import {setDoc, doc} from 'firebase/firestore';
import {ROUTE_PATHS, MAX_LENGTH_PASSWORD} from '../constants';
import {useAuth, useForm, useMounted, useFirebase} from '../hooks';
import {AuthLayout, HideLabel, Button} from '../components';
import {validateEmail} from '../utils/validate';
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

const findRegisterError = (error) => {
  switch (error.code) {
    case AuthErrorCodes.EMAIL_EXISTS:
      return 'Email already in-use';
    default:
      return 'Something went wrong';
  }
};

const SignUpPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();

  const from = location.state?.from?.pathname ?? '/';

  const auth = useAuth();

  const mounted = useMounted();

  const firebase = useFirebase();

  const {values, errors, handleChange, handleSubmit} = useForm({
    initialValues: {
      email: '',
      name: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async (values) => {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          firebase.auth,
          values.email,
          values.password
        );

        const {user} = userCredential;

        const newUserData = {
          email: values.email,
          name: values.name,
          username: values.username,
          // Fake data
          avatar:
            'https://user-images.githubusercontent.com/47315479/81145216-7fbd8700-8f7e-11ea-9d49-bd5fb4a888f1.png',
          profile: 'https://www.instagram.com/phuc7320/',
          job: 'Wildlife Photographer',
          numberOfPosts: 98,
          numberOfFollowers: 3500,
          numberOfFollowingUsers: 900,
          bio: 'My specialty lies in creating colorful creations, amazing designs, and high-quality website artworks that have the potential to capture the attention while making a very positive first impression on the visitor visitor visitor visitor visitor',
          hasStory: false,
          socialLinks: ['https://dribbble.com/nkchaudhary01'],
        };

        await setDoc(doc(firebase.db, `users/${user.uid}`), newUserData);

        auth.setAuthStatus(true);

        navigate(from, {replace: true});
      } catch (error) {
        if (mounted.current) {
          setIsLoading(false);
        }

        const errorMessage = findRegisterError(error.code);
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

      if (!values.name) {
        errors.name = 'Please enter name';
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
    !values.name ||
    !values.username ||
    !values.password ||
    !values.confirmPassword;

  return (
    <AuthLayout
      questionText="Have an account? "
      toUrl={`/${ROUTE_PATHS.LOGIN}`}
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
        <HideLabel htmlFor="signup_name">Name</HideLabel>
        <AuthInput
          id="signup_name"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
        />
        {errors.name && <ErrorText>{errors.name}</ErrorText>}
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
