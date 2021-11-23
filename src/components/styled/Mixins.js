import {css} from 'styled-components';

export const textStyle = ({
  color = '#afc1d9',
  fontSize = '1.4rem',
  fontWeight = 500,
}) => css`
  color: ${color};
  font-size: ${fontSize};
  font-weight: ${fontWeight};
`;

export const responsive = {
  mobile: {
    standard: (...args) => css`
      @media (max-width: 600px) {
        ${css(...args)};
      }
    `,
  },
};

export const flexCenter = ({
  vertically = true,
  horizontally = true,
  direction = 'row',
}) => css`
  display: flex;
  ${direction !== 'row' &&
  css`
    flex-direction: column;
  `};
  ${vertically &&
  css`
    align-items: center;
  `}
  ${horizontally &&
  css`
    justify-content: center;
  `}
`;

export const flexColumn = css`
  display: flex;
  flex-direction: column;
`;

export const sizeSame = ({size}) => css`
  width: ${size};
  height: ${size};
`;

export const sizeCircle = ({size}) => css`
  ${sizeSame({size})}
  border-radius: 100%;
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

export const hoverUnderline = css`
  &:hover {
    text-decoration: underline;
    text-decoration-color: ${({theme}) => theme.colors.primary};
  }
`;
