import styled from "styled-components"
import { IoSearch } from "react-icons/io5"
import { MdClear } from "react-icons/md"
import { useState } from "react";
import { rgba } from "polished";

interface SearchbarProps {
    hasInput: boolean;
}

const StyledSearchbar = styled.div<SearchbarProps>`
    height: 50px;
    width: clamp(300px, 40%, 450px);
    max-width: 100%;
    background: var(--layout-nav-background);
    border: 2px solid var(--layout-content-background);
    border-radius: 20px;
    display: flex;
    padding:5px 20px;
    align-items: center;
    transition: 0.5s all ;
    box-shadow: ${p => p.hasInput ? `0px 2px 10px ${rgba(0, 0, 0, 0.05)}` : "none"};

    &:focus-within, &:hover{
        box-shadow: 0px 2px 10px ${rgba(0, 0, 0, 0.05)};
    }

    &:focus-within{
        @media (${({ theme }) => theme.bp.big}){
                width: calc(clamp(300px, 40%, 450px) + 20px);
        }
    }
    
    svg{
        margin-right: 15px;
        width: 30px;
        height: 30px;
        color:#535353;
    }

    .search-cancel {
        display: inline-flex;
        cursor: pointer;
        margin-left:5px;
        &:hover{
            transform: scale(1.25);
        }
        transition: transform 0.1s var(--easing);
        svg{
            align-self: center;
            transform: translateX(5px);
            margin: 0;
            width: 20px;
            height: 20px;
            color:#797979;
        }
    }
`;

const SearchbarInput = styled.input`
    width: 100%;
    height: 100%;
    font-family: "Roboto";
    font-weight: bold;
    border: none;
    background-color: transparent;  

    &::placeholder{
        color: #535353;
    }
`

export const Searchbar: React.FC = () => {
    const [search, setSearch] = useState<string>("");

    const handleType = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSearch(event.target.value)
    }

    return (
        <StyledSearchbar hasInput={!!search}>
            <IoSearch />
            <SearchbarInput placeholder="Type to search for apps ..." type="text" value={search} onChange={(e) => handleType(e)} />
            {!!search && <div
                className="search-cancel"
                onClick={() => setSearch("")}
                onKeyDown={() => setSearch("")}
                role="button"
                tabIndex={0}
                aria-label="Clear Search"
            >
                <MdClear />
            </div>}
        </StyledSearchbar>
    )
}