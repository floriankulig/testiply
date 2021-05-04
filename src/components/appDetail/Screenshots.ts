import { rgba } from "polished";
import styled from "styled-components";

const ScreenshotSection = styled.section`
  color: var(--navy);
  .screenshots {
    padding-top: 1em;
    padding-bottom: 2em;
    white-space: nowrap;
    width: max-content;
    display: flex;
    gap: 3em;
    overflow: visible;
  }
  h1.section-header {
    font-size: clamp(1.4rem, 3vw, 2rem);
    color: ${({ theme }) => rgba(theme.navy, 0.8)};
  }
`;

const Screenshot = styled.img`
  display: inline;
  max-height: 300px;
  width: auto;
  height: auto;
  border-radius: 0.5em;
  user-select: none;
  box-shadow: 3px 10px 20px ${({ theme }) => rgba(theme.navy, 0.1)};
  z-index: -1;
`;

export { Screenshot, ScreenshotSection };
