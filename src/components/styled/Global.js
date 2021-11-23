import {createGlobalStyle} from 'styled-components';

const GlobalStyles = createGlobalStyle`
	* {
	  box-sizing: inherit;
	}

	html {
	  box-sizing: border-box;
  	font-family: "Nunito";
		font-size: 62.5%;
	  line-height: 1.6rem;
	  scroll-behavior: smooth;
	}

	body {
	  margin: 0;
	  padding: 0;
		background-color: ${({theme}) => theme.colors.bgApp};
	}

	:where(ul, ol) {
	  list-style: none;
		margin: 0;
		padding: 0;
	}

	a {
	  display: inline-block;
	  text-decoration: none;
		cursor: pointer;
	}

	img, video {
	  max-width: 100%;
	  height: auto;
	}

	:where(h1, h2, h3, h4, h5, h6) {
	  margin: 0;
	}

	button {
		padding: 0;
		font-family: inherit;
	}

	p {
		margin: 0;
	}
`;

export default GlobalStyles;
