import { css } from "styled-components";

const fadeUp = css`
  @keyframes fadeUp {
    0% {
      opacity: 0;
      transform: translate3d(0, 70px, 0);
    }
    100% {
      transform: translate3d(0, 0px, 0);
      opacity: 1;
    }
  }
`;

const growRight = css`
  @keyframes growRight {
    from {
      transform: scaleX(0);
    }
    to {
      transform: scaleX(1);
    }
  }
`;

const transitions = css`
  .pop-in-enter,
  .pop-in-appear {
    transform: scale(0.5);
    opacity: 0;
  }
  .pop-in-enter-active,
  .pop-in-appear-active {
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

  .fade-right-enter,
  .fade-right-appear {
    transform: translate3d(-70px, 0, 0);
    opacity: 0;
  }
  .fade-right-enter-active,
  .fade-right-appear-active {
    transform: translate3d(0, 0, 0);
    opacity: 1;
    transition: 0.3s all var(--easing);
  }
  .fade-right-exit {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  .fade-right-exit-active {
    transform: translate3d(-70px, 0, 0);
    opacity: 0;
    transition: 0.3s all var(--easing);
  }

  .fade-down-enter,
  .fade-down-appear {
    transform: translate3d(0, 70px, 0);
    opacity: 0;
  }
  .fade-down-enter-active,
  .fade-down-appear-active {
    transform: translate3d(0, 0, 0);
    opacity: 1;
    transition: 0.3s all var(--easing);
  }
  .fade-down-exit {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  .fade-down-exit-active {
    transform: translate3d(0, -70px, 0);
    opacity: 0;
    transition: 0.3s all var(--easing);
  }

  [data-scroll] {
    transition: 0.3s var(--easing);
    transition-property: opacity, transform;
    opacity: 0;
    transform: translate3d(0, 30px, 0);
  }
  [data-scroll="in"] {
    transform: translate3d(0, 0px, 0);
    opacity: 1;
  }

  ${fadeUp}
  ${growRight}
`;

export default transitions;
