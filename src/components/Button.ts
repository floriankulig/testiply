import { darken, rgba, rgb } from 'polished';
import styled, { css } from 'styled-components';
import { getTextColor } from 'helpers';

interface ButtonProps {
  big?: boolean;
  basic?: boolean;
  transparent?: boolean;
  rounded?: boolean;
  bold?: boolean;
  disableElevation?: boolean;
  color?: string;
}

export const Button = styled.button<ButtonProps>`
  border: none;
  cursor: pointer;
  font-family: 'Roboto';
  transition: 0.25s all;
  ${(p) => p.bold && 'font-weight: bold'};
  ${(p) =>
    p.big
      ? css`
          padding: 18px 32px;
          font-size: 16px;
        `
      : css`
          padding: 16px 32px;
          font-size: 14px;
        `};
  ${(p) =>
    p.rounded
      ? css`
          padding: 0.8em 1.8em;
          border-radius: 3em;
        `
      : css`
          border-radius: var(--border-radius);
        `};

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
          color: ${p.color ? p.color : 'var(--primary)'};
          box-shadow: none;
          border: 1px solid
            ${p.basic ? (p.color ? p.color : 'var(--primary)') : 'none'};

          &:hover {
            background-color: ${p.color
              ? rgba(p.color, 0.1)
              : rgba(p.theme.primary, 0.1)};
            box-shadow: none;
          }
        `
      : css`
          //default styles (normal primary color)
          background-color: ${p.color ? p.color : 'var(--primary)'};
          color: ${p.color ? getTextColor(p.color) : '#ffffff'};
          &:hover {
            background-color: ${p.color
              ? darken(0.05, p.color)
              : darken(0.05, p.theme.primary)};
          }
        `};

  &:disabled {
    cursor: default;
    background-color: ${rgba(0, 0, 0, 0.12)};
    color: #c8c8c8;
    box-shadow: none;
    border: #c8c8c8;
    &:hover {
      box-shadow: none;
    }
  }

  &.button-appear {
    opacity: 0;
    transform: scale(0.1);
  }
  &.button-appear-active {
    transition: 300ms all var(--easing);
    transform: scale(1);
    opacity: 1;
  }
  &.button-enter {
    opacity: 0;
    transform: scale(0.1);
  }
  &.button-enter-active {
    transition: 300ms all var(--easing);
    transform: scale(1);
    opacity: 1;
  }
  &.button-exit {
    transform: scale(1);
    opacity: 1;
  }
  &.button-exit-active {
    transition: 300ms all var(--easing);
    opacity: 0;
    transform: scale(0.1);
  }
`;
