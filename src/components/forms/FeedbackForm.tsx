import React, { useState } from "react";
import { Field, Form, Formik, FormikValues } from "formik";
import { AnimatePresence, motion } from "framer-motion";
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
import { ErrorMessage } from "components/ErrorMessage";
import { rgba } from "polished";
import { useAuthValue } from "context";
import { TesterAuthForm } from "components/auth";
import { useCannotScroll } from "hooks";
import { MdError } from "react-icons/md";
import axios from "axios";
import { InfoNote } from "components/InfoNote";

const Wrapper = styled.div<{ done: boolean }>`
  width: clamp(200px, 100%, 400px);
  margin: 0 ${(p) => p.done && "auto"};
  text-align: ${(p) => (p.done ? "center" : "left")};
`;

const FeedbackDone = styled.div`
  p {
    color: ${({ theme }) => rgba(theme.navy, 0.7)};
    margin: -0.5em 0 0;
  }
  .svg-wrapper {
    width: 70%;
    margin: 0 15%;
    padding: 0 10% 15%;
    background: var(--layout-content-background);
    border-radius: 51% 49% 37% 63% / 64% 44% 56% 36%;
    box-shadow: 1px 3px 8px ${({ theme }) => rgba(theme.navy, 0.05)};
    svg {
      stroke-width: 8;
      width: 90%;
      fill: none;
      .check {
        width: 100%;
        height: 100%;
        stroke-dasharray: 70;
        stroke-dashoffset: 70;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke: var(--primary);
        animation: check 0.5s var(--easing) 0.5s forwards;
      }
    }
  }
  .note-wrapper {
    margin-top: 2em;
  }
  @keyframes check {
    from {
      stroke-dashoffset: 70;
    }
    to {
      stroke-dashoffset: 0;
    }
  }
`;

interface FormValues {
  heading: string;
  text: string;
  rating: number;
}

interface FeedbackFormProps {
  appId: string;
  appName: string;
  showsSampleInfo: boolean;
}

export const FeedbackForm: React.FC<FeedbackFormProps> = ({
  appId,
  appName,
  showsSampleInfo,
}) => {
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { currentUser } = useAuthValue();

  useCannotScroll(authModalOpen);

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
    if (showsSampleInfo) {
      setHasSubmitted(true);
      return;
    }
    if (!!currentUser) {
      await axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/feedback`, {
          ...values,
          date: getFormattedDate(new Date()),
          appId,
          appName,
        })
        .then(() => {
          setHasSubmitted(true);
        })
        .catch((err) => {
          setErrorMessage(err.response.data.err);
        });
    } else {
      setAuthModalOpen(true);
    }
  };

  return (
    <>
      <Wrapper done={hasSubmitted}>
        <motion.h1
          layoutId="leaveFeedbackHead"
          animate
          className="section-header"
        >
          {hasSubmitted ? "Thanks for your feedback" : "Leave your feedback"}
        </motion.h1>
        {hasSubmitted ? (
          <FeedbackDone as={motion.div} layoutId="leaveFeedbackContent">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.25 }}
              className="svg-wrapper"
            >
              <svg viewBox="0 0 100 100">
                <polyline
                  className="check"
                  points="25.5,53.5 39.5,67.5 72.5,34.5 "
                />
              </svg>
              <motion.p
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.75 }}
              >
                The Developers will thank you!
              </motion.p>
            </motion.div>
            {showsSampleInfo && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.9 }}
                className="note-wrapper"
              >
                <InfoNote>
                  You could leave your Feedback because this is a sample app.
                </InfoNote>
              </motion.div>
            )}
          </FeedbackDone>
        ) : (
          <Formik
            initialValues={initialValues}
            onSubmit={async (values) => await handleSubmit(values)}
            validationSchema={validationSchema}
          >
            {({ isSubmitting }) => (
              <Form autoComplete="off">
                <motion.div layoutId="leaveFeedbackContent">
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
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${field.value * 20}%` }}
                            className="fill-ratings"
                          >
                            <span>
                              {[...Array(5)].map((_, i) => (
                                <i
                                  key={`fill-${i}`}
                                  onClick={() => setFieldValue("rating", i + 1)}
                                  onKeyDown={() =>
                                    setFieldValue("rating", i + 1)
                                  }
                                  tabIndex={0}
                                  aria-label={`Give rating ${i + 1}`}
                                >
                                  ★
                                </i>
                              ))}
                            </span>
                          </motion.div>
                          <div className="empty-ratings">
                            <span>
                              {[...Array(5)].map((_, i) => (
                                <i
                                  key={`empty-${i}`}
                                  onClick={() => setFieldValue("rating", i + 1)}
                                  onKeyDown={() =>
                                    setFieldValue("rating", i + 1)
                                  }
                                  tabIndex={0}
                                  aria-label={`Give rating ${i + 1}`}
                                  style={{
                                    color:
                                      !!touched &&
                                      !!error &&
                                      rgba(255, 0, 0, 0.2),
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
                  <AnimatePresence>
                    {!!errorMessage && (
                      <ErrorMessage
                        as={motion.p}
                        initial={{ scale: 0.1 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.1 }}
                      >
                        <MdError />
                        Error: {errorMessage}
                      </ErrorMessage>
                    )}
                  </AnimatePresence>
                  <Button
                    type="submit"
                    bold
                    disabled={isSubmitting || hasSubmitted}
                    style={{ marginTop: "2em" }}
                  >
                    {isSubmitting ? <Loading size={40} /> : "Submit"}
                  </Button>
                </motion.div>
              </Form>
            )}
          </Formik>
        )}
      </Wrapper>
      {authModalOpen && (
        <TesterAuthForm formType="login" asModal setOpen={setAuthModalOpen} />
      )}
    </>
  );
};
