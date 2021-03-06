import styled, {css} from 'styled-components';
import {circle} from './Mixins';
import {LogoTextIcon} from '../icons';
import {DEVICES} from '../../constants';

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
  box-shadow: inset 0px 4px 40px rgba(175, 193, 217, 0.12);
  border-radius: 5px;

  ${({theme}) => css`
    color: ${theme.colors.blueAlpha};
    background-color: ${theme.colors.blueAlphaBackground};

    &:focus {
      outline: 1px solid ${theme.colors.blueAlpha};
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

export const FakeButtonLabel = styled.label`
  cursor: pointer;
  font-size: 2.4rem;
`;

export const OverlayLabel = styled.label`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: transparent;
  z-index: 1;
  display: none;

  ${FakeCheckbox}:checked ~ & {
    display: block;
  }
`;

export const MenuItem = styled.li`
  font-size: 1.4rem;
  cursor: pointer;

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

export const PageContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(
    100vh - var(--padding-top-main-content-mobile) -
      var(--padding-bottom-main-content)
  );

  @media ${DEVICES.laptop} {
    min-height: unset;
    height: 100%;
  }
`;

const GridLayout = css`
  display: grid;
  grid-gap: 25px;
`;

export const PostList = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 25px;

  ${({$postLength}) => {
    switch ($postLength) {
      case 1:
        return css`
          @media ${DEVICES.tablet} {
            --col-config: 2;

            ${GridLayout}
            grid-template-columns: repeat(var(--col-config), minmax(300px, 1fr));
          }

          @media ${DEVICES.laptop} {
            --col-config: 3;
          }
        `;
      case 2:
        return css`
          @media ${DEVICES.tablet} {
            --col-config: auto-fit;

            ${GridLayout}
            grid-template-columns: repeat(var(--col-config), minmax(300px, 1fr));
          }

          @media ${DEVICES.laptop} {
            --col-config: 3;
          }
        `;
      default:
        return css`
          @media ${DEVICES.tablet} {
            ${GridLayout}
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          }
        `;
    }
  }}
`;

export const UserMenuSectionTitle = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 2.2rem;
`;
