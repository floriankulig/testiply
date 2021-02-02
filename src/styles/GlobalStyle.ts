import { createGlobalStyle } from 'styled-components';
import theme from './theme';
import { rgba } from 'polished';
import transitions from './transitions';

const GlobalStyle = createGlobalStyle`
  :root{
    --primary: ${theme.primary};
    --navy: ${theme.navy};
    --border-radius: ${theme.borderRadius};
    --sidebar-width: ${theme.sidebarWidth};
    --auth-sidebar-width: ${theme.authSidebarWidth};
    --header-height: ${theme.headerHeight};
    --inner-padding: 50px;
    --mobile-inner-padding: 25px;
    --layout-nav-background: ${theme.layoutNavBg};
    --layout-content-background: ${theme.layoutContentBg};
    --sidebarDuration: 0.2s;
    --easing: cubic-bezier(0.645, 0.045, 0.355, 1);
    --btn-shadow: ${rgba(0, 0, 0, 0.2)} 0px 3px 1px -2px,
      ${rgba(0, 0, 0, 0.14)} 0px 2px 2px 0px,
      ${rgba(0, 0, 0, 0.12)} 0px 1px 5px 0px; 
    --btn-shadow-hover: ${rgba(0, 0, 0, 0.2)} 0px 2px 4px -1px,
      ${rgba(0, 0, 0, 0.14)} 0px 4px 5px 0px,
      ${rgba(0, 0, 0, 0.12)} 0px 1px 10px 0px;
  }

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

  *:focus{
    outline: none;
  }

  body {
    margin: 0;
    padding: 0;
    line-height: 1;
    font-family: 'Roboto', sans-serif;
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

  .link{
    position: relative;
    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      height: 2px;
      width: 100%;
      border-radius: 1px;
      background: currentColor;

      transform: scaleX(0);
      transform-origin: right;
      transition: transform 0.3s var(--easing);
    }

    &:hover::after,
    &:focus::after {
      transform: scaleX(1);
      transform-origin: left;
    }
  }

  .container {
    width: 90%;
    // not using margin: 0 auto; here, because that would interfear with (Styled)Components with container class
    // we only want to control the margin on the sides, therefore the centering of an Component
    margin-left: auto;
    margin-right: auto;

    @media (min-width: 1081px) {
      width: 70%;
    }
  }

  .inner-content {
    padding-left:var(--mobile-inner-padding);
    padding-right:var(--mobile-inner-padding);
    @media (min-width: 1081px) {
      padding-left:var(--inner-padding);
      padding-right:var(--inner-padding);
    }
  }

  ${transitions}
`;

export default GlobalStyle;
