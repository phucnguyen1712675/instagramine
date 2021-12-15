import styled from 'styled-components';

export const GuideText = styled.h2`
	margin: 0 40px 6px;
  color: ${({theme}) => theme.colors.secondary};
	font-size: 1.7rem;
	font-weight: 600;
	text-align: center;
	line-height: 2rem;
`;

export const TermAndPolicyText = styled.p`
  margin: 10px 40px;
	color: ${({theme}) => theme.colors.secondary};
	font-size: 1.2rem;
	line-height: 1.6rem;
	text-align: center;
`;

export const TextAndPolicyLink = styled.a`
	color: ${({theme}) => theme.colors.secondary};
	font-size: 1.2rem;
	line-height: 1.6rem;
	font-weight: 600;
`;