import { darken } from "polished";
import styled from "styled-components";

interface FormInputProps {
    hasValidInput?: boolean;
}

//support for label above input
export const FormInput = styled.div<FormInputProps>`
    margin-top: 1em;
    label{
        font-size: 0.9rem;
        font-weight: bold;
    }
`;

export const TextField = styled.div`
    display: block;
    width: clamp(250px, 100%, 400px);
    margin-top: .2em;
    padding: .8em 1em;
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
        &:focus-within{
            transform: translateX(5px);
        }

        // remove default styling for browser validation
        &:invalid {
            box-shadow: none;
        }
        transition: transform 0.2s ease;
    }
`;
