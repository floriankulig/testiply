import { Button } from "components/Button";
import { rgba } from "polished";
import { FaChevronRight } from "react-icons/fa";
import styled from "styled-components";

export const StyledAppStoreRow = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-x: visible;
  margin-bottom: 4em;
`;

export const StyledAppRowHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h2.tab-name {
    color: var(--navy);
    font-size: 1.6rem;
    font-weight: normal;
    margin: 0;
    display: flex;
    align-items: center;
    svg {
      margin-right: 0.5em;
      color: ${({ theme }) => rgba(theme.navy, 0.6)};
      font-size: 1.8rem;
    }
  }
  ${Button} {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1rem;
    padding: 0.75em;
    svg {
      margin: 0 0 1px 5px;
    }
  }
`;
export const StyledAppRow = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 350px);
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  gap: clamp(1em, 3vw, 2.5em);
  scrollbar-color: #fff;
  scrollbar-width: thin;
`;

interface ViewAllButtonProps {
  clickHandler: () => void;
}
export const ViewAllButton: React.FC<ViewAllButtonProps> = ({
  clickHandler,
}) => {
  return (
    <Button
      onClick={clickHandler}
      onKeyDown={clickHandler}
      tabIndex={-1}
      aria-label="View all apps of this tab"
      transparent
    >
      View All <FaChevronRight />
    </Button>
  );
};
