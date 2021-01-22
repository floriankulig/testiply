import { Button } from "components/Button";
import React, { useState } from "react"
import styled from "styled-components";
import { theme } from "styles";
import { FormikStepProps } from "./FormikStep"
import { FormikValues, FormikConfig, Formik, Form } from "formik";



export const FormikStepper = ({ children, ...props }: FormikConfig<FormikValues>) => {
    const childrenArray = React.Children.toArray(children) as React.ReactElement<FormikStepProps>[];
    const [step, setStep] = useState<number>(0);
    const currentChild = childrenArray[step] as React.ReactElement<FormikStepProps>

    const isLastStep = step === childrenArray.length - 1

    return (
        <Formik
            {...props}
            validationSchema={currentChild.props.validationSchema}
            onSubmit={async (values, helpers) => {
                if (isLastStep) {
                    await props.onSubmit(values, helpers)
                    console.log("submitted")
                } else {
                    setStep(step => step + 1)
                }
            }}>
            <Form autoComplete="off">
                {currentChild}
                <ToggleFormButtons>
                    <Button
                        bold
                        color={theme.layoutContentBg}
                        disableElevation
                        disabled={step <= 0}
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
