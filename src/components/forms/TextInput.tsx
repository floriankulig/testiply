import { useField } from 'formik'
import React from 'react'
import { StyledFormInput, StyledMetaInputInfo, SVGWrapper, StyledTextField } from './FormInput'


export const TextInput = ({ svg, svgClickHandler, label, ...restProps }: any) => {
    const [field, meta] = useField(restProps);
    const showsError: boolean = meta.touched && meta.error ? true : false

    return (
        <StyledFormInput>
            <StyledMetaInputInfo>
                {label}
                {showsError && (
                    <span className="error">{meta.error}</span>
                )}
            </StyledMetaInputInfo>
            <StyledTextField hasError={showsError}>
                <input
                    {...field} {...restProps}
                />
                <SVGWrapper
                    onClick={() => { !!svgClickHandler && svgClickHandler() }}
                    onKeyDown={() => { !!svgClickHandler && svgClickHandler() }}
                    clickable={!!svgClickHandler}
                >
                    {svg}
                </SVGWrapper>
            </StyledTextField>
        </StyledFormInput>
    )
}
