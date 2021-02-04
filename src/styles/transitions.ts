import { css } from "styled-components";

const fadeUp = css`
  @keyframes fadeUp {
    0% {
      opacity: 0;
      transform: translateY(50px);
    }
    100% {
      transform: translateY(0px);
      opacity: 1;
    }
  }
`;

const transitions = css`
  .pop-in-enter {
    transform: scale(0.5);
    opacity: 0;
  }
  .pop-in-enter-active {
    transform: scale(1);
    opacity: 1;
    transition: 0.25s all var(--easing);
  }
  .pop-in-exit {
    transform: scale(1);
    opacity: 1;
  }
  .pop-in-exit-active {
    transform: scale(0.5);
    opacity: 0;
    transition: 0.25s all var(--easing);
  }
  .fade-right-enter {
    transform: translateX(-70px) scale(0.8);
    opacity: 0;
  }
  .fade-right-enter-active {
    transform: translateX(0) scale(1);
    opacity: 1;
    transition: 0.3s all var(--easing);
  }
  .fade-right-exit {
    transform: translateX(0) scale(1);
    opacity: 1;
  }
  .fade-right-exit-active {
    transform: translateX(-70px) scale(0.8);
    opacity: 0;
    transition: 0.3s all var(--easing);
  }

  [data-scroll] {
    transition: 0.3s var(--easing);
    transition-property: opacity, transform;
    opacity: 0;
    transform: translateY(30px);
  }
  [data-scroll="in"] {
    transform: translateY(0px);
    opacity: 1;
  }

  ${fadeUp}
`;

export default transitions;
