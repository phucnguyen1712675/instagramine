import React from 'react';
import PropTypes from 'prop-types';
import {
  StyledAuthLayout,
  AuthLayoutInner,
  ContainerStyle,
  ChangeAuthPageText,
  ToUrlLink,
} from './styled/AuthLayout.styled';

const AuthLayout = ({children, questionText, toUrl, toPageText}) => {
  return (
    <StyledAuthLayout>
      <AuthLayoutInner>
        <ContainerStyle>{children}</ContainerStyle>
        <ContainerStyle>
          <ChangeAuthPageText>
            {questionText}
            <ToUrlLink to={toUrl}>{toPageText}</ToUrlLink>
          </ChangeAuthPageText>
        </ContainerStyle>
      </AuthLayoutInner>
    </StyledAuthLayout>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
  questionText: PropTypes.string.isRequired,
  toUrl: PropTypes.string.isRequired,
  toPageText: PropTypes.string.isRequired,
};

export default AuthLayout;
