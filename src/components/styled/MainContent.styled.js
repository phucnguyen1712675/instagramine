import styled from 'styled-components';

export const StyledMainContent = styled.main`
  grid-area: mainContent;
  padding: 25px 20px;
  overflow-y: auto;

	/* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const PostWrapper = styled.div`
  display: grid;
  gap: 25px;
`;
