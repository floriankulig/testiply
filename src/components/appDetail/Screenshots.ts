import styled from "styled-components";

const ScreenshotSection = styled.section`
  width: 100%;
  color: var(--navy);
  & > * {
    padding: 0 5%;
    @media (${({ theme }) => theme.bp.medium}) {
      padding: 0 15%;
    }
  }
  .screenshots {
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
`;

export { Screenshot, ScreenshotSection };
