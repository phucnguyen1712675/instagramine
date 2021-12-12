import {css} from 'styled-components';

export const wh = ({w = '100%', h = w}) => css`
  width: ${w};
  height: ${h};
`;

export const circle = ({w = '100%', h = w}) => css`
  ${wh({w, h})};
  border-radius: 100%;
  overflow: hidden;
`;

export const hideScrollBarScrolling = css`
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const hoverUnderline = ({color}) => css`
  &:hover {
    text-decoration: underline;
    text-decoration-color: ${color ?? 'inherit'};
  }
`;

export const brighterHover = css`
  transition: filter 0.2s ease-out;

  &:hover {
    --amount: 1.2;
    filter: brightness(var(--amount));
  }
`;

export const buttonColorHover = ({color}) => css`
  transition: color 0.2s ease-out, border-color 0.2s ease-out;

  &:hover {
    ${({theme}) => `
			color: ${color ?? theme.colors.link};
    	border-color: ${color ?? theme.colors.link};
		`};
  }
`;
