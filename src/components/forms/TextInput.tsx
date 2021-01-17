import React from 'react'
import { FormInput, SVGWrapper, TextField } from './FormInput'

interface TextInputProps {
    children: React.ReactNode;
    inputType: "text" | "password";
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    svg: JSX.Element;
    placeholder: string;
    svgClickHandler?: Function;
}

export const TextInput: React.FC<TextInputProps> = ({ inputType, children, value, setValue, svg, placeholder, svgClickHandler }) => {
    return (
        <FormInput>
            {children}
            <TextField>
                <input
                    type={inputType}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <SVGWrapper
                    onClick={() => { !!svgClickHandler && svgClickHandler() }}
                    onKeyDown={() => { !!svgClickHandler && svgClickHandler() }}
                    clickable={!!svgClickHandler}
                >
                    {svg}
                </SVGWrapper>
            </TextField>
        </FormInput>
    )
}
