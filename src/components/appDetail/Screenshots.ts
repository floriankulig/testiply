import { rgba } from "polished";
import styled from "styled-components";

const ScreenshotSection = styled.section`
  width: 100%;
  color: var(--navy);
  & > * {
    padding: 0 5%;
    @media (${({ theme }) => theme.bp.medium}) {
      padding: 0 20%;
    }
  }
  .screenshots {
    padding-top: 1em;
    padding-bottom: 2em;
    overflow-y: auto;
    white-space: nowrap;
    display: flex;
    gap: 3em;
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
  opacity: 0;
  animation: fadeUp 0.4s var(--easing) forwards;
  z-index: -1;
`;

export { Screenshot, ScreenshotSection };
