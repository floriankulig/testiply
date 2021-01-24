import { darken, lighten, rgba } from "polished";
import styled, { css } from "styled-components";

interface TextFieldProps {
    hasError?: boolean;
}

//support for label above input
export const StyledFormInput = styled.div`
    margin-top: 1em;
    display: flex;
    flex-direction: column;
`;

export const StyledMetaInputInfo = styled.div`
    font-size: 0.9rem;
    font-weight: bold;
    display: flex;
    justify-content: space-between;

    .error-enter{
        color: grey;
        transform: translateY(100%);
        opacity: 0;
    }
    .error-enter-active{
        color: red;
        opacity: 1;
        transform: translateY(0);
        transition: all 0.25s var(--easing);
    }
    .error-enter-done{
        color: red;
    }
    .error-exit{
        color: red;
        opacity: 1;
        transform: translateY(0);
    }
    .error-exit-active{
        color: grey;
        opacity: 0;
        transform: translateY(100%);
        transition: all 0.25s var(--easing);
    }
`;

export const StyledTextField = styled.div<TextFieldProps>`
    display: inline-flex;
    width: clamp(1px, 100%, 600px);
    margin-top: .2em;
    height: 3.5em;
    padding: .5em 1em;
    align-items: center;
    font-size: 1rem;
    font-family: "Roboto";
    background: ${p => p.hasError ? rgba(255, 0, 0, 0.05) : "var(--layout-content-background)"};
    border: 2px ${p => p.hasError ? "red" : darken(0.1, p.theme.layoutContentBg)} solid; 
    border-radius: var(--border-radius);
    transition: 0.5s;
    transition-property:
        border background;


    input, span{
        background: none;
        border: none;
        font-family: "Roboto";
        font-size: 1rem;
        width: 95%;
        height: 100%;
        display: inline-flex;
        font-weight: normal;
        align-items: center;
        &:focus-within{
            margin-left: .4em;
        }

        // remove default styling for browser validation
        &:invalid {
            box-shadow: none;
        }
        transition: margin 0.3s ease;
    }

    span {
        opacity: .8;
    }
`;

interface SVGWrapperProps {
    clickable?: boolean;
}

// for wrapping svgs in inputs if there are any
export const SVGWrapper = styled.div<SVGWrapperProps>`
        border-radius: 30%;
        width: 40px;
        justify-content: center;
        align-items: center;
        height: 100%;
        padding: 5px;
        transition: all 0.25s ease;
        color: ${p => lighten(0.1, p.theme.navy)};

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

