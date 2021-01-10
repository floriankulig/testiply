import { darken } from "polished";
import styled, { css } from "styled-components";

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
    font-family: "Roboto";
    background: var(--layout-content-background);
    border: 2px ${p => darken(0.1, p.theme.layoutContentBg)} solid; 
    border-radius: var(--border-radius);
    transition: border 0.3s var(--easing);


    input, span{
        background: none;
        border: none;
        font-family: "Roboto";
        font-size: 1rem;
        width: 95%;
        height: 100%;
        display: inline-flex;
        align-items: center;
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

interface SVGWrapperProps {
    clickable?: boolean;
}

// for wrapping svgs in inputs if there are any
export const SVGWrapper = styled.div<SVGWrapperProps>`
        border-radius: 30%;
        justify-content: center;
        align-items: center;
        height: 100%;
        padding: 5px;
        transition: all 0.25s ease;

        svg{
            width: 100%;
            height: 100%;
        }

        ${p => p.clickable && css`
            cursor: pointer;
            &:hover{
                background: var(--layout-nav-background);
                color: var(--primary);
            }
        `}
`
