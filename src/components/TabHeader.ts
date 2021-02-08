import styled, { css } from "styled-components";

export const TabHeader = styled.h1`
  margin: 0 0 1.5em;
  display: flex;
  align-items: center;
  flex-direction: column;
  //TODO: make custom path absolute -> no layout shift

  span,
  div {
    margin: 0 auto 0 0;
    display: inline-flex;
    align-items: center;
  }

  i {
    color: grey;
    font-weight: normal;
    margin: 0 7px;
    transform: scaleX(0.7);
  }

  @media (${({ theme }) => theme.bp.small}) {
    flex-direction: row;
    span,
    div {
      margin: 0;
    }
  }
`;

export const BasePath = styled.span<{ hasIcon?: boolean }>`
  position: relative;
  color: var(--navy);
  padding-left: ${(p) => p.hasIcon && "30px"};
  transition: 0.25s var(--easing);
  transition-property: color, padding;
  z-index: 1;
  svg {
    position: absolute;
    left: -4px;
  }

  ${(p) =>
    p.hasIcon &&
    css`
      &:hover {
        cursor: pointer;
        color: var(--primary);
      }
    `}
`;

export const CustomPath = styled.span`
  color: grey;
  font-weight: normal;
  font-size: 1.7rem;
`;
