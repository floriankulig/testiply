import styled from "styled-components"
import { IoSearch } from "react-icons/io5"
import { useState } from "react";
import { rgba } from "polished";

interface SearchbarProps {
    hasInput: boolean;
}

const StyledSearchbar = styled.div<SearchbarProps>`
    height: 50px;
    width: clamp(350px, 40%, 450px);
    max-width: 100%;
    background: var(--layout-nav-background);
    border: 2px solid var(--layout-content-background);
    border-radius: 20px;
    display: flex;
    padding:5px 20px;
    align-items: center;
    transition: 0.5s all ;
    box-shadow: ${p => p.hasInput ? `0px 2px 10px ${rgba(0, 0, 0, 0.05)}` : "none"};

    &:focus-within{
        border-color: var(--navy);
        box-shadow:none;

        @media (${({ theme }) => theme.bp.big}){
            width: calc(clamp(350px, 40%, 450px) + 20px);
        }
    }

    svg{
        margin-right: 15px;
        width: 30px;
        height: 30px;
        color:#535353;
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

    const handleType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }

    return (
        <StyledSearchbar hasInput={!!search}>
            <IoSearch />
            <SearchbarInput placeholder="Type to search for apps ..." type="text" value={search} onChange={(e) => handleType(e)} />
        </StyledSearchbar>
    )
}