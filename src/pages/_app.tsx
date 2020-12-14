import { AppProps } from 'next/app'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    scroll-behavior: smooth;
  }
  *,
  *:before,
  *:after {
    -webkit-box-sizing: inherit;
    box-sizing: inherit;
  }

  body {
    margin: 0;
    padding: 0;
    line-height: 1;
    font-family: "Roboto", sans-serif;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  li {
    list-style: none;
  }

  a {
    text-decoration: none;
  }
  p {
    font-size: 16px;
    line-height: 1.4;
  }

  .container {
    width: 90%;
    // not using margin: 0 auto; here, because that would interfear with (Styled)Components with container class
    // we only want to control the margin on the sides, therefore the centering of an Component
    margin-left: auto;
    margin-right: auto;

    @media (min-width: 1021px) {
      width: 70%;
    }
  }
`;

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
