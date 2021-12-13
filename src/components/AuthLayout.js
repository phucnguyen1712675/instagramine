import React from 'react';
import PropTypes from 'prop-types';
import {StyledLink} from './styled/Lib';
import {
  StyledAuthLayout,
  AuthLayoutInner,
  ContainerStyle,
  Logo,
  AuthForm,
  ChangeAuthPageText,
} from './styled/AuthLayout.styled';

const AuthLayout = ({children, onSubmit, questionText, toUrl, toPageText}) => {
  return (
    <StyledAuthLayout>
      <AuthLayoutInner>
        <ContainerStyle>
          <Logo />
          <AuthForm onSubmit={onSubmit}>{children}</AuthForm>
        </ContainerStyle>
        <ContainerStyle>
          <ChangeAuthPageText>
            {questionText}
            <StyledLink to={toUrl}>{toPageText}</StyledLink>
          </ChangeAuthPageText>
        </ContainerStyle>
      </AuthLayoutInner>
    </StyledAuthLayout>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
  questionText: PropTypes.string.isRequired,
  toUrl: PropTypes.string.isRequired,
  toPageText: PropTypes.string.isRequired,
};

export default AuthLayout;
