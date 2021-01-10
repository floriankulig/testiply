import { capitalized } from "helpers";
import { darken, rgba } from "polished";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa"
import styled from "styled-components";
import { FormInput, SVGWrapper, TextField } from "../FormInput"

const Dropdown = styled.ul`
    position: absolute;
    width: 100%;
    right: 0;
    top: 66px;
    font-weight: normal;
    font-size: 1rem;
    border-radius:  0 0 var(--border-radius) var(--border-radius);
    background: var(--layout-content-background);
    border: 2px ${p => darken(0.1, p.theme.layoutContentBg)} solid;
    border-top: none;
    
    li {
        width: 100%;
        height: 3em;
        display: inline-flex;
        padding: .5em 1em;
        align-items: center;
        cursor: pointer;
        background: transparent;
        &:hover{
            background: ${({ theme }) => darken(0.05, theme.layoutContentBg)};
        }
    }
`;

interface SelectionInputProps {
    style?: Object;
    className?: string;
    selection: any;
    setSelection: React.Dispatch<React.SetStateAction<any>>;
    values: any[]
}

export const SelectionInput: React.FC<SelectionInputProps> = ({ style, className, selection, setSelection, values }) => {
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

    return (
        <FormInput style={{ position: "relative", ...style }} className={className}>
            Gender (optional)
            <TextField>
                <span>
                    {capitalized(selection)}
                </span>
                <SVGWrapper
                    clickable
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    onKeyDown={() => setDropdownOpen(!dropdownOpen)}
                    style={dropdownOpen ? {
                        transform: "rotate(180deg)",
                        background: "transparent"
                    } : { background: "transparent" }}
                >
                    <FaChevronDown />
                </SVGWrapper>
            </TextField>
            {dropdownOpen && (
                <Dropdown>
                    {values && values.filter(value => value !== selection).map(value => (
                        <li
                            key={value}
                            onClick={() => setSelection(value)}
                            onKeyDown={() => setSelection(value)}
                        >
                            {capitalized(value)}
                        </li>
                    ))}
                </Dropdown>
            )}
        </FormInput>
    )
}
