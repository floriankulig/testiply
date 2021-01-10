import { darken } from "polished";
import styled from "styled-components";

interface FormInputProps {
    hasValidInput?: boolean;
}

//support for label above input
export const FormInput = styled.div<FormInputProps>`
    margin-top: 1em;
    display: flex;
    flex-direction: column;
`;

export const TextField = styled.div`
    display: inline-flex;
    width: clamp(1px, 100%, 500px);
    margin-top: .2em;
    height: 3.5em;
    padding: .5em 1em;
    align-items: center;
    font-size: 1rem;
    cursor: text;
    font-family: "Roboto";
    background: var(--layout-content-background);
    border: 2px ${p => darken(0.1, p.theme.layoutContentBg)} solid; 
    border-radius: var(--border-radius);
    transition: border 0.3s var(--easing);


    input{
        background: none;
        border: none;
        font-family: "Roboto";
        font-size: 1rem;
        width: 95%;
        &:focus-within{
            margin-left: .5em;
        }

        // remove default styling for browser validation
        &:invalid {
            box-shadow: none;
        }
        transition: margin 0.2s ease;
    }
    
`;

// for wrapping svgs in inputs if there are any
export const SVGWrapper = styled.div`
        border-radius: 30%;
        justify-content: center;
        align-items: center;
        height: 100%;
        padding: 5px;
        cursor: pointer;
        transition: all 0.25s ease;
        
        &:hover{
            background: var(--layout-nav-background);
            color: var(--primary);
        }

        svg{
            width: 100%;
            height: 100%;
        }
`
