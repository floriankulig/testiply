import styled from "styled-components";

export const MenuTransition = styled.div`
  position: relative;
  min-height: 100%;
  & .menu-primary-enter,
  & .menu-primary-appear {
    position: absolute;
    width: 100%;
    transform: translate3D(-110%, 0, 0);
  }
  & .menu-primary-enter-active,
  & .menu-primary-appear-active {
    transform: translate3D(0, 0, 0);
    transition: transform 0.4s var(--easing);
    position: relative;
  }
  & .menu-primary-exit {
    position: absolute;
  }
  & .menu-primary-exit-active,
  & .menu-primary-exit-done {
    position: absolute;
    transform: translate3D(-110%, 0, 0);
    transition: transform 0.4s var(--easing);
    width: 100%;
  }

  & .menu-secondary-enter {
    transform: translate3D(110%, 0, 0);
    width: 100%;
  }
  & .menu-secondary-enter-active {
    transform: translate3D(0, 0, 0);
    transition: transform 0.4s var(--easing);
  }
  & .menu-secondary-exit {
    transform: translate3D(110%, 0, 0);
  }
  & .menu-secondary-exit-active,
  & .menu-secondary-exit-done {
    transform: translate3D(110%, 0, 0);
    transition: transform 0.4s var(--easing);
    width: 100%;
    min-height: 100%;
    position: relative;
  }
`;
