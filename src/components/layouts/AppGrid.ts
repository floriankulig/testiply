import styled from "styled-components";

export const AppGrid = styled.ul<{ small?: boolean }>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  @media (${({ theme }) => theme.bp.small}) {
    grid-template-columns: 2;
  }
  @media (${({ theme }) => theme.bp.big}) {
    grid-template-columns: repeat(
      auto-fit,
      minmax(${(p) => (p.small ? "280px" : "350px")}, 1fr)
    );
  }
  gap: clamp(1em, 3vw, 2.5em);

  h2.loading {
    display: inline-flex;
    justify-content: center;
    color: #c8c8c8;
    margin-top: 10vh;
  }

  .full-grid-width {
    margin-top: 4em;
  }
`;
