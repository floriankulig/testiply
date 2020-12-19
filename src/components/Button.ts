import { darken, rgba } from "polished";
import styled, { css } from "styled-components";

interface ButtonProps {
  basic?: boolean;
  transparent?: boolean;
  rounded?: boolean;
  bold?: boolean;
  disableElevation?: boolean;
  color?: string;
}

export const Button = styled.button<ButtonProps>`
  border: none;
  padding: 0.8em 1.8em;
  font-size: 1.1rem;
  ${(p) => p.bold && "font-weight: bold"};
  border-radius: ${(p) => (p.rounded ? "3em" : "var(--border-radius)")};
  cursor: pointer;
  transition: 0.5s all;
  ${(p) =>
    !p.disableElevation &&
    css`
      box-shadow: var(--btn-shadow);
      &:hover {
        box-shadow: var(--btn-shadow-hover);
      }
    `}

  ${(p) =>
    p.transparent || p.basic //When Button is transparent or basic
      ? css`
          background-color: transparent;
          color: ${p.color ? p.color : "var(--primary)"};
          box-shadow: none;
          border: 1px solid
            ${p.basic ? (p.color ? p.color : "var(--primary)") : "none"};

          &:hover {
            background-color: ${p.color
              ? rgba(p.color, 0.1)
              : rgba(p.theme.primary, 0.1)};
            box-shadow: none;
          }
        `
      : css`
          //default styles (normal primary color)
          background-color: ${p.color ? p.color : "var(--primary)"};
          color: white;
          &:hover {
            background-color: ${p.color
              ? darken(0.05, p.color)
              : darken(0.05, p.theme.primary)};
          }
        `};

  &:disabled {
    cursor: default;
    background-color: ${rgba(0, 0, 0, 0.12)};
    color: rgba(0, 0, 0, 0.26);
    box-shadow: none;
    &:hover {
      box-shadow: none;
    }
  }
`;
