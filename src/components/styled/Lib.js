import styled, {css} from 'styled-components';
import {Link} from 'react-router-dom';
import {circle} from './Mixins';
import LogoTextIcon from '../icons/LogoTextIcon';

export const Dot = styled.span`
  --size: 4px;
  display: inline-block;
  ${circle({w: 'var(--size)'})};
  background-color: ${({theme}) => theme.colors.secondary};
`;

export const CircleImgWrapper = styled.div`
  --size: 4rem;
  ${circle({w: 'var(--size)'})}

  img {
    ${circle}
    object-fit: cover;
    background-color: ${({theme}) => theme.colors.bgComponentLightTheme};
  }
`;

export const PostMediaWrapper = styled.div`
  --padding-horizontal: 5px;
  padding-left: var(--padding-horizontal);
  padding-right: var(--padding-horizontal);
`;

export const TextInput = styled.input.attrs({
  type: 'text',
  autoComplete: 'off',
  role: 'presentation',
})`
  padding: 9px 7px;
  font-size: 1.4rem;
  font-weight: 400;
  background: #f8fbff;
  box-shadow: inset 0px 4px 40px rgba(175, 193, 217, 0.12);
  border-radius: 5px;

  ${({theme}) => css`
    color: ${theme.colors.blueAlphaAction};

    &:focus {
      outline: 1px solid ${theme.colors.blueAlphaAction};
    }
  `};
`;

export const SearchInput = styled(TextInput).attrs({
  type: 'search',
})``;

export const FakeCheckbox = styled.input.attrs({
  type: 'checkbox',
})`
  display: none;
`;

export const OverlayLabel = styled.label`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: transparent;
  z-index: 2;
  display: none;

  ${FakeCheckbox}:checked ~ & {
    display: block;
  }
`;

export const MenuItem = styled.li`
  font-size: 1.4rem;

  &:hover {
    background-color: #fafafa;
  }
`;

export const DisabledButtonWrapper = styled.div`
  display: inline-block;

  ${({$disabled}) =>
    $disabled &&
    css`
      cursor: not-allowed;
    `}
`;

export const Logo = styled(LogoTextIcon)`
  width: 175px;
  height: 51px;
  margin: 22px auto 12px;
`;

export const AuthForm = styled.form`
  display: flex;
  align-items: stretch;
  justify-content: center;
  flex-direction: column;
  flex-shrink: 0;
  width: 100%;
  margin: 24px 0;
`;

export const AuthInput = styled(TextInput)`
  margin: 0 40px 12px;
  outline: 1px solid rgba(175, 193, 217, 0.5);
`;

export const PasswordAuthInput = styled(AuthInput).attrs({
  type: 'password',
  autocomplete: 'new-password',
})``;

export const EmailAuthInput = styled(AuthInput).attrs({
  type: 'email',
})``;

export const ErrorText = styled.p`
  margin: 0 40px 12px;
  color: ${({theme}) => theme.colors.danger};
`;

export const SubmitButtonWrapper = styled(DisabledButtonWrapper)`
  margin: 6px 40px;
`;

// export const SubmitButton = styled(Button)`
//   font-size: 1.4rem;
// `;

export const StyledLink = styled(Link)`
  color: ${({theme}) => theme.colors.link};
  font-weight: 600;
`;
