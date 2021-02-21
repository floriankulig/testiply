import { useOnClickOutside } from "hooks";
import { useRef } from "react";
import styled from "styled-components";
import { TabRow, Tabs } from "./Tabs";
import { BiLogOut } from "react-icons/bi";
import { useAuthValue, useFiltersValue } from "context";
import { SelectionInput } from "components/SelectionInput";
import { platforms } from "ts";
import { useRouter } from "next/router";
import { CSSTransition } from "react-transition-group";

interface StyledSidebarProps {
  open: boolean;
}

const StyledSidebar = styled.div<StyledSidebarProps>`
  background-color: var(--layout-nav-background);
  width: var(--sidebar-width);
  transform: ${(p) =>
    p.open ? "translate3D(0, 0, 0)" : "translate3D(-100%, 0, 0)"};
  @media (${({ theme }) => theme.bp.big}) {
    transform: translate3D(0, 0, 0);
  }
  height: 100vh;
  position: fixed;
  z-index: 99999;
  transition: var(--sidebarDuration) transform var(--easing);
  overflow-y: auto;

  .logo {
    display: inline-flex;
    align-items: center;
    font-weight: bold;
    font-size: 1.5rem;
    width: max-content;
    margin: 0 50px;
    height: var(--header-height);
  }
`;

const SidebarContent = styled.div`
  min-height: calc(100vh - var(--header-height));
  padding: 3em 0 5em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  & .padd {
    padding: 0 15px;
  }
`;

interface SidebarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const { selectedPlatform, setSelectedPlatform } = useFiltersValue();
  const { pathname } = useRouter();
  const isDevRoute = pathname.split("/")[1] === "dev";

  const ref = useRef<HTMLDivElement>();
  const { currentUser, logout } = useAuthValue();
  useOnClickOutside(ref, () => setOpen(false));

  return (
    <StyledSidebar ref={ref} open={open}>
      <div className="logo">BetaStore </div>
      <SidebarContent>
        <div>
          <Tabs
            tabTypes={isDevRoute ? "dev" : "tester"}
            setSidebarOpen={setOpen}
          />
          <div className="padd">
            {!isDevRoute && (
              <SelectionInput
                style={{ marginBottom: "6em" }}
                selection={selectedPlatform}
                setSelection={setSelectedPlatform}
                label="Platform"
                values={platforms}
              />
            )}
          </div>
        </div>
        <CSSTransition
          in={!!currentUser}
          classNames="pop-in"
          timeout={250}
          appear
          unmountOnExit
        >
          <TabRow
            selected={false}
            icon
            style={{ marginTop: "3em" }}
            onClick={() => logout()}
            onKeyDown={() => logout()}
          >
            <span>
              <BiLogOut />
            </span>
            Logout
          </TabRow>
        </CSSTransition>
      </SidebarContent>
    </StyledSidebar>
  );
};
