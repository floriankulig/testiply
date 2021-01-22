import { Field, FieldAttributes } from 'formik'
import React from 'react'
import { FormInput, SVGWrapper, TextField } from './FormInput'

interface TextInputProps extends FieldAttributes<any> {
    svg: JSX.Element;
    svgClickHandler?: Function;
}

export const TextInput: React.FC<TextInputProps> = ({ svg, svgClickHandler, label, ...restProps }) => {
    return (
        <FormInput>
            {label}
            <TextField>
                <Field
                    {...restProps}
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
