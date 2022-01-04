import {useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {ROUTE_PATHS, MAX_LENGTH_PASSWORD} from '../constants';
import {useAuth, useForm, useMounted} from '../hooks';
import {AuthLayout, HideLabel, Button} from '../components';
import {validateEmail} from '../utils/validate';
import {
  addNewUserDoc,
  setFakeFollowRequests,
  setFakeJunctionUserStoryCategory,
  setFakeJunctionUserFollowingUser,
  setFakeJunctionUserSearchHistory,
} from '../services/firestore';
import {register} from '../services/firestoreAuth';
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
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();

  const from = location.state?.from?.pathname ?? '/';

  const auth = useAuth();

  const mounted = useMounted();

  const {values, errors, handleChange, handleSubmit} = useForm({
    initialValues: {
      email: '',
      name: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async (values) => {
      setIsLoading(true);

      const userCredential = await register(values.email, values.password);

      if (userCredential) {
        const {user} = userCredential;

        const fakeData = {
          avatar:
            'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80',
          profile: 'https://www.instagram.com/phuc7320/',
          job: 'Wildlife Photographer',
          numberOfPosts: 98,
          numberOfFollowers: 3500,
          numberOfFollowingUsers: 900,
          bio: 'My specialty lies in creating colorful creations, amazing designs, and high-quality website artworks that have the potential to capture the attention while making a very positive first impression on the visitor visitor visitor visitor visitor',
          hasStory: false,
          socialLinks: ['https://dribbble.com/nkchaudhary01'],
        };

        const newUserData = {
          ...fakeData,
          email: values.email,
          name: values.name,
          username: values.username,
        };

        await addNewUserDoc(user.uid, newUserData);

        await Promise.all([
          setFakeFollowRequests(user.uid),
          setFakeJunctionUserStoryCategory(user.uid),
          setFakeJunctionUserFollowingUser(user.uid),
          setFakeJunctionUserSearchHistory(user.uid),
        ]);

        auth.setAuthStatus(true);

        navigate(from, {replace: true});
      } else if (mounted.current) {
        setIsLoading(false);
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
