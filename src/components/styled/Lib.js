import styled, {css} from 'styled-components';
import {circle} from './Mixins';

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

export const Input = styled.input.attrs(() => ({
  type: 'text',
}))`
  padding: 0 50px;
  font-size: 1.8rem;
  font-weight: 400;
  background: #f8fbff;
  box-shadow: inset 0px 4px 40px rgba(175, 193, 217, 0.12);
  border-radius: 8px;

  ${({theme}) => css`
    color: ${theme.colors.blueAlphaAction};

    &:focus {
      outline: 1px solid ${theme.colors.blueAlphaAction};
    }
  `};
`;

export const FakeCheckbox = styled.input.attrs(() => ({
  type: 'checkbox',
}))`
  display: none;
`;

export const MenuItem = styled.li`
  font-size: 1.4rem;

  &:hover {
    background-color: #fafafa;
  }
`;

export const DisabledButtonWrapper = styled.div`
  display: inline-block;

  ${({$disabled}) => $disabled && 'cursor: not-allowed;'}
`;

export const VisuallyHidden = styled.span`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;
