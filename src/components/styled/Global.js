import {createGlobalStyle, css} from 'styled-components';

const GlobalStyles = createGlobalStyle`
	* {
	  box-sizing: inherit;
  	font-family: "Nunito";
	}

	html {
	  box-sizing: border-box;
		font-size: 62.5%;
	  line-height: 1.6rem;
	  scroll-behavior: smooth;
	}

	body {
	  margin: 0;
	  padding: 0;
		font-size: 1.4rem;	
		font-weight: 500;
		${({theme}) => css`
      color: ${theme.colors.primary};
      background-color: ${theme.colors.bgApp};
    `};
	}

	ul, ol {
	  list-style: none;
		margin: 0;
		padding: 0;
	}

	a {
	  display: inline-block;
	  text-decoration: none;
		cursor: pointer;
		color: inherit;
	}

	img, video {
		display: block;
	  max-width: 100%;
	  height: auto;
	}

	:where(h1, h2, h3, h4, h5, h6) {
	  margin: 0;
	}

	button {
		font-family: inherit;
	}

	p {
		margin: 0;
	}

	input {
		border: none;
	}

	input::placeholder {
		color: inherit;
		font-size: inherit;
		font-weight: inherit;
		line-height: inherit;
		user-select: none;
	}

	input[type="search"]::-webkit-search-cancel-button {
  	-webkit-appearance: none;
  	height: 1em;
  	width: 1em;
  	border-radius: 50em;
  	background: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDIwMDEwOTA0Ly9FTiIKICJodHRwOi8vd3d3LnczLm9yZy9UUi8yMDAxL1JFQy1TVkctMjAwMTA5MDQvRFREL3N2ZzEwLmR0ZCI+CjxzdmcgdmVyc2lvbj0iMS4wIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiB3aWR0aD0iMWVtIiBoZWlnaHQ9IjFlbSIgdmlld0JveD0iMCAwIDUxMi4wMDAwMDAgNTEyLjAwMDAwMCIKIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIG1lZXQiPgoKPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsNTEyLjAwMDAwMCkgc2NhbGUoMC4xMDAwMDAsLTAuMTAwMDAwKSIKZmlsbD0iI2FmYzFkOSIgc3Ryb2tlPSJub25lIj4KPHBhdGggZD0iTTIzODAgNDc5NCBjLTE5IC0yIC03MSAtOSAtMTE1IC0xNSAtODg2IC0xMTggLTE2MjUgLTc2MCAtMTg2MQotMTYxNiAtNjEgLTIyNSAtNzggLTM0OSAtNzggLTU5OCAtMSAtMjQ4IDEyIC0zNTEgNzAgLTU3MyA5NiAtMzcxIDI4MyAtNzA0CjU0OSAtOTgwIDM1MCAtMzY0IDc3NiAtNTg1IDEyOTAgLTY2OSAxNTIgLTI1IDQ5NSAtMjQgNjUwIDEgMzM2IDU0IDY0NCAxNzEKOTA4IDM0NyA1MzQgMzU1IDg4NSA5MDcgOTg0IDE1NDkgMjQgMTU5IDI0IDQ4MSAwIDY0MCAtNzggNTA1IC0zMDMgOTQyIC02NjcKMTI5NCAtMzMyIDMyMCAtNzI0IDUxNiAtMTE5NSA1OTcgLTExNSAxOSAtNDQ0IDM0IC01MzUgMjN6IG05MzkgLTE0MTQgYzUzCi0yNyA4MyAtNzcgODMgLTE0MCAtMSAtMjcgLTYgLTU5IC0xMiAtNzIgLTYgLTEzIC0xNDUgLTE1NSAtMzA4IC0zMTUgbC0yOTcKLTI5MyAzMDcgLTMwMiBjMjY5IC0yNjUgMzA4IC0zMDggMzE0IC0zNDAgMTAgLTU4IC00IC0xMDUgLTQzIC0xNDkgLTQ0IC00OAotOTUgLTY1IC0xNTUgLTQ5IC0zNyAxMCAtODMgNTIgLTM0NiAzMTMgbC0zMDMgMzAyIC0yOTcgLTMwMiBjLTI2MiAtMjY2IC0zMDIKLTMwMyAtMzM5IC0zMTMgLTExNCAtMjkgLTIyMCA3MSAtMTk4IDE4NiA3IDQyIDMyIDY5IDQxNSA0NTYgbDE5NSAxOTggLTI5NwoyOTcgYy0zMjAgMzIyIC0zMjAgMzIxIC0zMDMgNDEwIDkgNDkgNjkgMTA5IDExOCAxMTggODkgMTcgODggMTcgNDEwIC0zMDMKbDI5NyAtMjk3IDI5OCAyOTcgYzE2MyAxNjQgMzA4IDMwMiAzMjIgMzA3IDQxIDE2IDk4IDEyIDEzOSAtOXoiLz4KPC9nPgo8L3N2Zz4K") no-repeat 50% 50%;
  	background-size: contain;
		opacity: 0;
  	pointer-events: none;
	}

	input[type="search"]:focus::-webkit-search-cancel-button {
	  opacity: 1;
	  pointer-events: all;
	}

	svg {
		display: block;
	}
`;

export default GlobalStyles;
