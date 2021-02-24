import { useField } from "formik";
import { CSSTransition } from "react-transition-group";
import { StyledFormInput, StyledMetaInputInfo, StyledTextFieldArea } from ".";

export const FormikTextArea = ({ label, ...restProps }: any) => {
  const [field, meta] = useField(restProps);
  const showsError: boolean = meta.touched && meta.error ? true : false;

  return (
    <StyledFormInput>
      <StyledMetaInputInfo>
        {label}
        <CSSTransition
          in={showsError}
          classNames="error"
          timeout={250}
          unmountOnExit
        >
          <span>{meta.error}</span>
        </CSSTransition>
      </StyledMetaInputInfo>
      <StyledTextFieldArea hasError={showsError}>
        <textarea {...field} {...restProps} />
      </StyledTextFieldArea>
    </StyledFormInput>
  );
};
