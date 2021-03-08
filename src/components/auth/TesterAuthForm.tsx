import { Button } from "components/Button";
import { AuthForm, FormikTextInput } from "components/forms";
import React, { useRef, useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { MdEmail, MdError } from "react-icons/md";
import { FormType } from "ts";
import { Form, Formik, FormikValues } from "formik";
import * as Yup from "yup";
import { FormikCheckbox } from "components/forms/FormikCheckbox";
import Link from "next/link";
import { CSSTransition } from "react-transition-group";
import { ErrorMessage } from "components/ErrorMessage";
import axios from "axios";
import { useRouter } from "next/router";
import { capitalized } from "helpers";
import { Loading } from "components/Loading";
import { Overlay } from "components/Overlay";
import { useAuthValue } from "context";
import { useOnClickOutside } from "hooks";

interface TesterAuthFormProps {
  formType: FormType;
  asModal?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormValues {
  email: string;
  password: string;
  confirmPassword?: string;
  acceptedTAS?: boolean;
}

export const TesterAuthForm: React.FC<TesterAuthFormProps> = ({
  formType,
  asModal = false,
  setOpen,
}) => {
  const [showPasswords, setShowPasswords] = useState<boolean>(false);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [type, setType] = useState<FormType>(formType);
  const { renewUid } = useAuthValue();
  const ref = useRef<HTMLDivElement>(null);
  if (asModal) {
    useOnClickOutside(ref, () => setOpen(false));
  }

  const initialValues: FormValues =
    type === "login"
      ? {
          email: "",
          password: "",
        }
      : {
          email: "",
          password: "",
          confirmPassword: "",
          acceptedTAS: false,
        };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid format").required("Required").min(3),
    password: Yup.string()
      .required("Required")
      .min(8, "Has to be at least 8 characters"),
    confirmPassword:
      type === "register"
        ? Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Required")
        : undefined,
    acceptedTAS: type === "register" ? Yup.boolean().oneOf([true]) : undefined,
  });

  const handleSubmit = async (values: FormikValues) => {
    setErrorMessage("");
    const body = { mail: values.email, password: values.password };
    await axios
      .post(
        `${process.env.API_URL}/${type === "register" ? "register" : "login"}`,
        body
      )
      .then(async (res) => {
        await renewUid(res.data.userId);
        if (asModal) {
          setOpen(false);
        } else {
          router.push("/store");
        }
      })
      .catch((err) => {
        setErrorMessage(err.response.data.err);
      });
  };

  const body = (
    <AuthForm ref={ref}>
      <h1>{type === "register" ? "Register" : "Login"}</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => await handleSubmit(values)}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form autoComplete="off">
            <FormikTextInput
              name="email"
              svg={<MdEmail />}
              label="E-Mail Address"
              placeholder="Enter your E-Mail Address"
            />
            <FormikTextInput
              name="password"
              label="Password"
              placeholder="Must be at least 8 characters"
              type={showPasswords ? "text" : "password"}
              svg={showPasswords ? <AiFillEyeInvisible /> : <AiFillEye />}
              svgClickHandler={() => setShowPasswords((prev) => !prev)}
            />
            {type === "register" && (
              <>
                <FormikTextInput
                  name="confirmPassword"
                  label="Confirm Password"
                  placeholder="Must be at least 8 characters"
                  type={showPasswords ? "text" : "password"}
                  svg={showPasswords ? <AiFillEyeInvisible /> : <AiFillEye />}
                  svgClickHandler={() => setShowPasswords((prev) => !prev)}
                />
                <FormikCheckbox name="acceptedTAS">
                  {/*LINK NEEDS TO POINT TO TERMS AND CONDITIONS LATER*/}I agree
                  to the&nbsp;
                  <Link href="/register">
                    <span className="link">Terms and Conditions</span>
                  </Link>
                </FormikCheckbox>
              </>
            )}
            <CSSTransition
              in={!!errorMessage}
              classNames="pop-in"
              timeout={250}
              unmountOnExit
            >
              <ErrorMessage>
                <MdError />
                {capitalized(type)} error: {errorMessage}
              </ErrorMessage>
            </CSSTransition>
            <Button bold type="submit">
              {!isSubmitting ? (
                type === "register" ? (
                  "Register"
                ) : (
                  "Log In"
                )
              ) : (
                <Loading size={40} />
              )}
            </Button>
          </Form>
        )}
      </Formik>
    </AuthForm>
  );

  if (asModal) {
    return <Overlay>{body}</Overlay>;
  } else {
    return <>{body}</>;
  }
};
