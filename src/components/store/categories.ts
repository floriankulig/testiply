import { darken, rgba } from "polished";
import styled from "styled-components";

interface Props {
  color: string;
}
const CategoryChip = styled.li<Props>`
  padding: 0.7em 1.3em;
  display: flex;
  align-items: center;
  border-radius: 14px;
  background: ${({ theme }) => darken(0.02, theme.layoutContentBg)};
  box-shadow: 0px 3px 7px ${({ theme }) => rgba(theme.navy, 0.15)};
  cursor: pointer;
  font-size: clamp(1rem, 2vw, 1.2rem);
  transition: 350ms linear;
  transition-property: box-shadow, background;

  &:hover {
    background: ${(p) => rgba(p.color, 0.3)};
  }

  svg {
    margin-right: 0.5em;
    font-size: clamp(1.5rem, 4vw, 2rem);
  }
`;

export { CategoryChip };
