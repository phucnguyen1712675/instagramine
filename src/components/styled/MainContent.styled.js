import styled from 'styled-components';
import {hideScrollBarScrolling} from './Mixins';

export const StyledMainContent = styled.main`
  grid-area: mainContent;
  padding: 25px 20px;
  overflow-y: auto;
  ${hideScrollBarScrolling}
`;

export const PostWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 25px;
`;
