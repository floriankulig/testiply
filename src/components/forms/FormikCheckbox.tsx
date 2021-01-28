import { useField } from "formik";
import { darken } from "polished";
import styled from "styled-components";
import { StyledFormInput } from ".";

interface CheckboxHolderProps {
    hasError: boolean;
}
const CheckboxHolder = styled.div<CheckboxHolderProps>`
    margin-right: 15px;
    width: min-content;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    line-height: 16px;

    label {
        cursor: pointer;
        font-size: 10px;
        display: grid;  
        grid-template-columns: auto 3fr;

        svg {
            width: 2.5em;
            stroke: ${p => p.hasError ? "red " : darken(0.1, p.theme.layoutContentBg)};
            transition: all 0.3s var(--easing);
            stroke-width: 8;
            fill: white;

            .box {
                stroke-dasharray: 320;
                stroke-dashoffset: 0;
                fill: white !important;
            }
            .check {
                stroke-dasharray: 70;
                stroke-dashoffset: 70;
                fill: none;
            }
        }
    }

    &.checked label {
        .box {
          stroke-dashoffset: 320;
          transition: stroke-dashoffset 0.3s linear;
        }
        .check {
          stroke-dashoffset: 0;
          transition: stroke-dashoffset 0.3s linear;
        }
      }

    .reverse {
        .box {
            stroke-dashoffset: 0;
            transition: stroke-dashoffset 0.3s linear;
        }
        .check {
            stroke-dashoffset: 70;
            transition: stroke-dashoffset 0.3s linear;
    }
    }
`;

export const ContentHolder = styled.div`
    display: inline-flex;
    align-items: center;
`;

export const FormikCheckbox = ({ children, ...props }: any) => {
    const [field, meta, helpers] = useField(props)
    const showsError: boolean = meta.touched && meta.error ? true : false

    return (
        <StyledFormInput>
            <ContentHolder>
                <CheckboxHolder
                    className={field.value ? "checkbox-holder checked" : `checkbox-holder`}
                    onClick={() => helpers.setValue(!field.value)}
                    onKeyDown={() => helpers.setValue(!field.value)}
                    role="button"
                    hasError={showsError}
                    tabIndex={0}
                >
                    <label htmlFor="cb" id="checkbox">
                        <svg
                            viewBox="0 0 100 100"
                            className={field.value ? "reverse" : undefined}
                        >
                            <path
                                className="box"
                                d="M82,89H18c-3.87,0-7-3.13-7-7V18c0-3.87,3.13-7,7-7h64c3.87,0,7,3.13,7,7v64C89,85.87,85.87,89,82,89z"
                            />
                            <polyline className="check" points="25.5,53.5 39.5,67.5 72.5,34.5 " />
                        </svg>
                    </label>
                </CheckboxHolder>
                {children}
            </ContentHolder>
        </StyledFormInput>
    );
};