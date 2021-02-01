import { css } from 'styled-components';

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
`;

export default transitions;
