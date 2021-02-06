import styled from "styled-components";

const CategoryGrid = styled.ul`
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
`;

const CategoryChip = styled.li`
  padding: 0.7em 1.3em;
  display: flex;
  align-items: center;
  border-radius: var(--border-radius);
  box-shadow: var(--btn-shadow);
  cursor: pointer;
  opacity: 0;
  font-size: clamp(1rem, 2vw, 1.2rem);
  animation: fadeUp 0.3s var(--easing) forwards;
  transition: box-shadow 300ms var(--easing);

  &:hover {
    box-shadow: var(--btn-shadow-hover);
  }

  svg {
    margin-right: 0.5em;
    font-size: clamp(1.5rem, 4vw, 2rem);
  }
`;

export { CategoryGrid, CategoryChip };
