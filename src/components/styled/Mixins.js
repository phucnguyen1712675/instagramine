import {css} from 'styled-components';

export const responsive = {
  mobile: {
    standard: (...args) => css`
      @media (max-width: 600px) {
        ${css(...args)};
      }
    `,
  },
};

export const textStyle = ({
  color,
  fontSize = '1.4rem',
  fontWeight = 500,
}) => css`
  color: ${({theme}) => color ?? theme.colors.primary};
  font-size: ${fontSize};
  font-weight: ${fontWeight};
`;

export const wh = ({w = '100%', h = w}) => `
  width: ${w};
  height: ${h};
`;

export const circle = ({w = '100%', h = w}) => `
  ${wh({w, h})};
  border-radius: 100%;
	overflow: hidden;
`;

export const hideScrollBarScrolling = `
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
    text-decoration-color: ${({theme}) => color ?? theme.colors.primary};
  }
`;

export const hideComponent = `
	display: none;
`;
