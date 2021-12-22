import styled, {css} from 'styled-components';
import {DEVICES} from '../../constants';

const GridLayout = css`
  display: grid;
  grid-gap: 25px;
`;

export const StyledPostList = styled.div`
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
