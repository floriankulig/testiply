import React from "react";
import { Field, Form, Formik, FormikValues } from "formik";
import { motion } from "framer-motion";
import * as Yup from "yup";
import { capitalized, getFormattedDate } from "helpers";
import { FormikTextInput, StyledMetaInputInfo } from ".";
import styled from "styled-components";
import { Button } from "components/Button";
import { FormikTextArea } from "./FormikTextArea";
import { Loading } from "components/Loading";
import { CSSTransition } from "react-transition-group";
import { StyledFormInput } from "./FormInput";
import { StarRatings } from "components/appDetail";
import { rgba } from "polished";

const Wrapper = styled.div`
  width: clamp(200px, 100%, 400px);
`;

interface FormValues {
  heading: string;
  text: string;
  rating: number;
}

interface FeedbackFormProps {
  appId: string;
}

export const FeedbackForm: React.FC<FeedbackFormProps> = ({ appId }) => {
  const initialValues: FormValues = {
    heading: "",
    text: "",
    rating: 0,
  };

  const validationSchema = Yup.object({
    heading: Yup.string()
      .required("Required")
      .min(6, "Must be at least 6 characters")
      .max(30, "Can't be longer than 30 characters"),
    text: Yup.string()
      .required("Required")
      .min(120, "Must be at least 120 characters"),
    rating: Yup.number()
      .moreThan(0, "Must give a Rating")
      .lessThan(6)
      .required("Must give a Rating"),
  });

  const handleSubmit = async (values: FormikValues) => {
    console.log({ ...values, date: getFormattedDate(new Date()), appId });
  };

  return (
    <>
      <motion.h1 layoutId="leaveFeedbackHead" className="section-header">
        Leave your feedback
      </motion.h1>
      <Wrapper>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values) => await handleSubmit(values)}
          validationSchema={validationSchema}
        >
          {({ isSubmitting }) => (
            <Form autoComplete="off">
              <Field name="rating">
                {({
                  field, // { name, value, onChange, onBlur }
                  form: { setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                  meta: { touched, error },
                }) => (
                  <StyledFormInput>
                    <StyledMetaInputInfo>
                      {capitalized(field.name)}
                      <CSSTransition
                        in={!!touched && !!error}
                        classNames="error"
                        timeout={250}
                        unmountOnExit
                      >
                        <span>{error}</span>
                      </CSSTransition>
                    </StyledMetaInputInfo>
                    <StarRatings
                      style={{ fontSize: "50px", width: "min-content" }}
                      clickable
                    >
                      <div
                        className="fill-ratings"
                        style={{ width: `${field.value * 20}%` }}
                      >
                        <span>
                          {[...Array(5)].map((_, i) => (
                            <i
                              key={`fill-${i}`}
                              onClick={() => setFieldValue("rating", i + 1)}
                              onKeyDown={() => setFieldValue("rating", i + 1)}
                              tabIndex={0}
                              aria-label={`Give rating ${i + 1}`}
                            >
                              ★
                            </i>
                          ))}
                        </span>
                      </div>
                      <div className="empty-ratings">
                        <span>
                          {[...Array(5)].map((_, i) => (
                            <i
                              key={`empty-${i}`}
                              onClick={() => setFieldValue("rating", i + 1)}
                              onKeyDown={() => setFieldValue("rating", i + 1)}
                              tabIndex={0}
                              aria-label={`Give rating ${i + 1}`}
                              style={{
                                color:
                                  !!touched && !!error && rgba(255, 0, 0, 0.1),
                              }}
                            >
                              ★
                            </i>
                          ))}
                        </span>
                      </div>
                    </StarRatings>
                  </StyledFormInput>
                )}
              </Field>
              <FormikTextInput
                name="heading"
                label="Summary"
                placeholder="Sum up your feedback"
              />
              <FormikTextArea
                name="text"
                label="Feedback"
                placeholder="Share your experience"
              />
              <Button type="submit" bold style={{ marginTop: "2em" }}>
                {isSubmitting ? <Loading size={40} /> : "Submit"}
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </>
  );
};
