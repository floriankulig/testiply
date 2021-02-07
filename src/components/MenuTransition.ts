import styled from "styled-components";

export const MenuTransition = styled.div`
  position: relative;
  & .menu-primary-enter,
  & .menu-primary-appear {
    position: absolute;
    width: 100%;
    transform: translateX(-110%);
  }
  & .menu-primary-enter-active,
  & .menu-primary-appear-active {
    transform: translateX(0);
    transition: transform 0.4s var(--easing);
  }
  & .menu-primary-exit {
    position: absolute;
  }
  & .menu-primary-exit-active,
  & .menu-primary-exit-done {
    position: absolute;
    transform: translateX(-110%);
    transition: transform 0.4s var(--easing);
    width: 100%;
  }

  & .menu-secondary-enter {
    transform: translateX(110%);
    width: 100%;
  }
  & .menu-secondary-enter-active {
    transform: translateX(0);
    transition: transform 0.4s var(--easing);
  }
  & .menu-secondary-exit {
    transform: translateX(110%);
  }
  & .menu-secondary-exit-active {
    transform: translateX(110%);
    transition: transform 0.4s var(--easing);
    width: 100%;
  }
`;
