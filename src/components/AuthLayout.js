import React from 'react';
import PropTypes from 'prop-types';
import {StyledLink} from './styled/Lib';
import {
  StyledAuthLayout,
  AuthLayoutInner,
  ContainerStyle,
  ChangeAuthPageText,
} from './styled/AuthLayout.styled';

const AuthLayout = ({children, questionText, toUrl, toPageText}) => {
  return (
    <StyledAuthLayout>
      <AuthLayoutInner>
        <ContainerStyle>{children}</ContainerStyle>
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
  questionText: PropTypes.string.isRequired,
  toUrl: PropTypes.string.isRequired,
  toPageText: PropTypes.string.isRequired,
};

export default AuthLayout;
