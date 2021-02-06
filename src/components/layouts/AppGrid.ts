import styled from "styled-components";

export const AppGrid = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media (${({ theme }) => theme.bp.big}) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
  gap: 2.5em;

  h2.loading {
    display: inline-flex;
    justify-content: center;
    color: #c8c8c8;
    margin-top: 10vh;
  }

  li {
    opacity: 0;
    animation: fadeUp 0.4s var(--easing) forwards;
  }
`;
