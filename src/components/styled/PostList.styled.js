import styled, {css} from 'styled-components';
import {DEVICES} from '../../constants';

const GridLayout = css`
  display: grid;
  grid-gap: 25px;
`;

export const StyledPostList = styled.div`
  ${({$postLength}) => {
    switch ($postLength) {
      case 0:
        return css`
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
        `;
      case 1:
        return css`
          --col-config: auto-fit;

          ${GridLayout}
          grid-template-columns: repeat(var(--col-config), minmax(300px, 1fr));

          @media ${DEVICES.tablet} {
            --col-config: 2;
          }

          @media ${DEVICES.laptop} {
            --col-config: 3;
          }
        `;
      case 2:
        return css`
          --col-config: auto-fit;

          ${GridLayout}
          grid-template-columns: repeat(var(--col-config), minmax(300px, 1fr));

          @media ${DEVICES.laptop} {
            --col-config: 3;
          }
        `;
      default:
        return css`
          ${GridLayout}
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        `;
    }
  }}
`;

export const NoPostsText = styled.p``;
