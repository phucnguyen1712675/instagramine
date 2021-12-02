import styled from 'styled-components';

export const mediaStyle = `
	width: 100%;
	aspect-ratio: 1;
	object-fit: cover;
	border-radius: 15px;
	overflow: hidden;
`;

export const PostImage = styled.img`
  ${mediaStyle}
`;

export const PostVideo = styled.video`
  ${mediaStyle}
`;
