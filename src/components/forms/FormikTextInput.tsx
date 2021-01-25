import { useField } from 'formik'
import { CSSTransition } from 'react-transition-group';
import { StyledFormInput, StyledMetaInputInfo, SVGWrapper, StyledTextField } from '.'


export const FormikTextInput = ({ svg, svgClickHandler, label, ...restProps }: any) => {
    const [field, meta] = useField(restProps);
    const showsError: boolean = meta.touched && meta.error ? true : false

    return (
        <StyledFormInput>
            <StyledMetaInputInfo>
                {label}
                <CSSTransition in={showsError} classNames="error" timeout={250} unmountOnExit>
                    <span>{meta.error}</span>
                </CSSTransition>
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
