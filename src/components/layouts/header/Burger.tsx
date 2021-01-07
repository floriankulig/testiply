import React from 'react'
import styled from 'styled-components'

const StyledBurger = styled.div`
    min-width: 25px;
    height: 25px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-right:var(--mobile-inner-padding);
    @media (${({ theme }) => theme.bp.medium}) {
        margin-right:var(--inner-padding);
    }
    opacity: .75;
    z-index: 10000;

    &:hover {
        opacity: 1;
        transition: 0.25s all var(--easing);

        div{
            transition: 0.25s all var(--easing);
            background-color: var(--primary);
        }
    }

    div{
        background-color: var(--navy);
        width: 100%;
        height: 4px;
        border-radius: 2px;
    }
`

interface BurgerProps {
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const Burger: React.FC<BurgerProps> = ({ setSidebarOpen }) => {
    return (
        <StyledBurger
            className="burger"
            onClick={() => setSidebarOpen(true)}
            onKeyDown={() => setSidebarOpen(true)}
            role="button"
            tabIndex={0}
            aria-label="Open Sidebar Menu"
        >
            <div />
            <div />
            <div />
        </StyledBurger>
    )
}
