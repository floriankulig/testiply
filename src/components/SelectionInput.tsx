import { capitalized } from "helpers";
import { useOnClickOutside } from "hooks";
import { darken } from "polished";
import { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa"
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import { FormInput, SVGWrapper, TextField } from "./FormInput"

const Dropdown = styled.ul`
    position: absolute;
    width: 100%;
    right: 0;
    top: 66px;
    font-weight: normal;
    font-size: 1rem;
    z-index: 99;
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
        transition: 0.5s background;
    }

    &.dropdown-enter {opacity: 0; transform: translateY(-50%) scaleY(0.1);}
    &.dropdown-enter-active {opacity: 1; transform: translateY(0) scaleY(1); transition: .25s all var(--easing);}
    &.dropdown-exit {opacity: 1; transform: translateY(0) scaleY(1);}
    &.dropdown-exit-active {opacity: 0; transform: translateY(-50%) scaleY(0.1); transition: .25s all var(--easing);}
`;

interface SelectionInputProps {
    label?: string;
    style?: Object;
    className?: string;
    selection: string;
    setSelection: React.Dispatch<React.SetStateAction<string>>;
    optional?: boolean;
    values: any[]
}

export const SelectionInput: React.FC<SelectionInputProps> = ({ label, style, className, selection, optional, setSelection, values }) => {
    const [dropdownOpens, setDropdownOpens] = useState<boolean>(false);
    const dropdownShouldOpen: boolean = dropdownOpens && !!values[1] && !optional || dropdownOpens && !!values && optional

    const [active, setActive] = useState<string>(optional ? "No Selection" : selection);
    const ref = useRef<HTMLDivElement>()
    useOnClickOutside(ref, () => setDropdownOpens(false));

    const handleSelectionChange = (newSelection: string) => {
        if (newSelection) {
            setActive(newSelection)
            setSelection(newSelection)
        } else {
            setActive("No Selection")
            setSelection(null)
        }

        setDropdownOpens(false)
    }

    useEffect(() => {
        optional && setSelection(null)
    }, []);

    return (
        <FormInput style={{ position: "relative", ...style }} className={className}>
            {label && label}{optional && " (optional)"}
            <div ref={ref}>
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
                <CSSTransition in={dropdownShouldOpen} classNames="dropdown" timeout={300} unmountOnExit>
                    <Dropdown>
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
                </CSSTransition>
            </div>
        </FormInput>
    )
}
