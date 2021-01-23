import { Button } from "components/Button";
import React, { useState } from "react"
import styled from "styled-components";
import { theme } from "styles";
import { FormikStepProps } from "./FormikStep"
import { FormikValues, FormikConfig, Formik, Form, FormikProps } from "formik";

interface FormikStepperProps extends FormikConfig<FormikValues> {
    minLevel?: number
}

export const FormikStepper = ({ children, minLevel, ...props }: FormikStepperProps) => {
    const childrenArray = React.Children.toArray(children) as React.ReactElement<FormikStepProps>[];
    const minStep = minLevel ?? 0
    const [step, setStep] = useState<number>(minStep);
    const currentChild = childrenArray[step] as React.ReactElement<FormikStepProps>

    const isLastStep = step === childrenArray.length - 1

    return (
        <Formik
            {...props}
            validationSchema={currentChild.props.validationSchema}
            onSubmit={async (values, helpers) => {
                if (isLastStep) {
                    await props.onSubmit(values, helpers)
                } else {
                    setStep(step => step + 1)
                }
            }}>
            {(props: FormikProps<any>) => (
                <Form autoComplete="off">
                    {currentChild}
                    <ToggleFormButtons>
                        <Button
                            bold
                            color={theme.layoutContentBg}
                            disableElevation
                            disabled={step <= minStep}
                            onClick={() => setStep(step => step - 1)}
                            onKeyDown={() => setStep(step => step - 1)}
                            type="button"
                        >
                            Go Back
                    </Button>
                        <Button bold>
                            {isLastStep ? "Register" : "Next Step"}
                        </Button>
                    </ToggleFormButtons>
                </Form>
            )}
        </Formik >
    )
}




const ToggleFormButtons = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin-top: 1em;
    @media (min-width: 400px) {
        flex-direction: row;
    }
`;
