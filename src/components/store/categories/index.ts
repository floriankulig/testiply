import styled from "styled-components";

const CategoryGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5em;
`;

const CategoryChip = styled.li`
  padding: 1.2em 1em;
  border-radius: var(--border-radius);
  box-shadow: var(--btn-shadow);
  cursor: pointer;
  transition: box-shadow 300ms var(--easing);

  &:hover {
    box-shadow: var(--btn-shadow-hover);
  }
`;

export { CategoryGrid, CategoryChip };
