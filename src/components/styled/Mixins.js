import {css} from 'styled-components';

export const textStyle = ({
  color = '#afc1d9',
  fontSize = '1.4rem',
  fontWeight = 400,
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
  ${direction !== 'row' && 'flex-direction: column'};
  ${vertically && 'align-items: center;'}
  ${horizontally && 'justify-content: center;'}
`;

export const flexColumn = css`
  display: flex;
  flex-direction: column;
`;
