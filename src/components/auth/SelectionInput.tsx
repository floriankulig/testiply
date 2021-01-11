import { capitalized } from "helpers";
import { useOnClickOutside } from "hooks";
import { darken } from "polished";
import { useLayoutEffect, useRef, useState } from "react";
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
    optional?: boolean;
    setSelection: React.Dispatch<React.SetStateAction<any>>;
    values: any[]
}

export const SelectionInput: React.FC<SelectionInputProps> = ({ style, className, selection, optional, setSelection, values }) => {
    const [dropdownOpens, setDropdownOpens] = useState<boolean>(false);
    const dropdownShouldOpen: boolean = dropdownOpens && !!values[1] && !optional || dropdownOpens && !!values && optional

    const [active, setActive] = useState<typeof selection>(optional ? "No Selection" : selection);
    const ref = useRef<HTMLUListElement>()
    useOnClickOutside(ref, () => setDropdownOpens(false));

    const handleSelectionChange = (newSelection: typeof selection) => {
        if (newSelection) {
            setActive(newSelection)
            setSelection(newSelection)
        } else {
            setActive("No Selection")
            setSelection(null)
        }

        setDropdownOpens(false)
    }

    useLayoutEffect(() => {
        optional && setSelection(null)
    }, []);

    return (
        <FormInput style={{ position: "relative", ...style }} className={className}>
            Gender (optional)
            <TextField>
                <span>
                    {capitalized(active)}
                </span>
                <SVGWrapper
                    clickable
                    onClick={() => setDropdownOpens(!dropdownOpens)}
                    onKeyDown={() => setDropdownOpens(!dropdownOpens)}
                    style={dropdownOpens && dropdownShouldOpen ? {
                        transform: "rotate(180deg)",
                        background: "transparent"
                    } : { background: "transparent" }}
                >
                    <FaChevronDown />
                </SVGWrapper>
            </TextField>
            {dropdownShouldOpen && (
                <Dropdown ref={ref}>
                    {values && values.filter(value => value !== active).map(value => (
                        <li
                            key={value}
                            onClick={() => handleSelectionChange(value)}
                            onKeyDown={() => handleSelectionChange(value)}
                        >
                            {capitalized(value)}
                        </li>
                    ))}
                    {optional && active !== "No Selection" && <li
                        onClick={() => handleSelectionChange(null)}
                        onKeyDown={() => handleSelectionChange(null)}
                    >
                        {capitalized("No Selection")}
                    </li>}
                </Dropdown>
            )}
        </FormInput>
    )
}
