import { Button } from "components/Button";
import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "styles";
import { FormikStepProps } from "./FormikStep";
import { FormikValues, FormikConfig, Formik, Form, FormikProps } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import { ErrorMessage } from "components/ErrorMessage";
import { MdError } from "react-icons/md";

interface FormikStepperProps extends FormikConfig<FormikValues> {
  minLevel?: number;
  lastButtonText: string;
  errorMsg?: string;
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>;
}

export const FormikStepper = ({
  children,
  lastButtonText,
  minLevel,
  errorMsg,
  setErrorMsg,
  ...props
}: FormikStepperProps) => {
  const childrenArray = React.Children.toArray(
    children
  ) as React.ReactElement<FormikStepProps>[];
  const minStep = minLevel ?? 0;
  const [step, setStep] = useState<number>(minStep);
  const currentChild = childrenArray[
    step
  ] as React.ReactElement<FormikStepProps>;

  const isLastStep = step === childrenArray.length - 1;

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep) {
          await props.onSubmit(values, helpers);
        } else {
          setStep((step) => step + 1);
          setErrorMsg("");
        }
      }}
    >
      {(props: FormikProps<any>) => (
        <Form autoComplete="off">
          {currentChild}
          <AnimatePresence>
            {!!errorMsg && (
              <ErrorMessage
                as={motion.p}
                initial={{ scale: 0.1 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.1 }}
              >
                <MdError />
                Error: {errorMsg}
              </ErrorMessage>
            )}
          </AnimatePresence>
          <ToggleFormButtons>
            <Button
              bold
              color={theme.layoutContentBg}
              disableElevation
              disabled={step <= minStep}
              onClick={() => {
                setStep((step) => step - 1);
                setErrorMsg("");
              }}
              onKeyDown={() => {
                setStep((step) => step - 1);
                setErrorMsg("");
              }}
              type="button"
            >
              Go Back
            </Button>
            <Button bold>{isLastStep ? lastButtonText : "Next Step"}</Button>
          </ToggleFormButtons>
        </Form>
      )}
    </Formik>
  );
};

const ToggleFormButtons = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-top: 3em;
  @media (min-width: 400px) {
    flex-direction: row;
  }
`;
