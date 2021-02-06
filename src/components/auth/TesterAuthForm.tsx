import { Button } from "components/Button";
import { AuthForm, FormikTextInput } from "components/forms";
import { useState, useEffect } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { MdEmail, MdError } from "react-icons/md";
import { FormType } from "ts";
import { Form, Formik, FormikValues } from "formik";
import * as Yup from "yup";
import { FormikCheckbox } from "components/forms/FormikCheckbox";
import Link from "next/link";
import { api_url } from "ts/constants";
import styled from "styled-components";
import { darken, rgba } from "polished";
import { CSSTransition } from "react-transition-group";
import { ErrorMessage } from "components/ErrorMessage";
import axios from "axios";
import { useRouter } from "next/router";
import { capitalized } from "helpers";
import { Loading } from "components/Loading";
import { useCookies } from "react-cookie";

const Overlay = styled.div`
  display: grid;
  place-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100vw;
  height: 100vh;
  z-index: 99;
  transform: translate(-50%, -50%);
  background: ${({ theme }) => rgba(theme.navy, 0.3)};

  @media (${({ theme }) => theme.bp.big}) {
  }
`;

const StyledModal = styled.div`
  width: 400px;
  max-width: 90%;
  min-height: 450px;
  padding: 3.5em;
  background: var(--layout-nav-background);
  box-shadow: 10px 30px 70px ${({ theme }) => rgba(theme.navy, 0.25)};
  border-radius: 38% 62% 48% 52% / 30% 43% 57% 70%;
  border: 3px ${({ theme }) => darken(0.025, theme.layoutContentBg)} solid;
  color: var(--navy);
  text-align: center;

  h2 {
    opacity: 0;
    animation: fadeUp 0.5s var(--easing) forwards 0.05s;
  }
  p {
    opacity: 0;
    animation: fadeUp 0.5s var(--easing) forwards 0.1s;
    color: ${({ theme }) => rgba(theme.navy, 0.8)};
    margin-bottom: 2em;
  }
  ${Button} {
    opacity: 0;
    animation: fadeUp 0.5s var(--easing) forwards 0.15s;
  }
`;

const SvgWrapper = styled.div`
  background: var(--layout-content-background);
  width: clamp(50px, 30vw, 120px);
  height: clamp(45px, 25vw, 110px);
  display: grid;
  place-items: center;
  margin: 0 auto;
  border-radius: 57% 43% 62% 38% / 33% 39% 61% 67%;
  margin-bottom: 2em;
  opacity: 0;
  animation: fadeUp 0.5s var(--easing) forwards;

  svg {
    color: var(--primary);
    width: clamp(40px, 15vw, 70px);
    height: 100%;
  }
`;

interface TesterAuthFormProps {
  formType: FormType;
}

interface FormValues {
  email: string;
  password: string;
  confirmPassword?: string;
  acceptedTAS?: boolean;
}

export const TesterAuthForm: React.FC<TesterAuthFormProps> = ({ formType }) => {
  const [showPasswords, setShowPasswords] = useState<boolean>(false);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [cookie, setCookie] = useCookies(["token"]);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  useEffect(() => {
    modalOpen
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = null);
  }, [modalOpen]);

  const initialValues: FormValues =
    formType === "login"
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
      formType === "register"
        ? Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Required")
        : undefined,
    acceptedTAS:
      formType === "register" ? Yup.boolean().oneOf([true]) : undefined,
  });

  const handleSubmit = async (values: FormikValues) => {
    if (formType === "register") {
      await axios
        .post(`${api_url}/register`, {
          email: values.email,
          password: values.password,
        })
        .then(() => {
          setModalOpen(true);
        })
        .catch((err) => {
          setErrorMessage(err.response.data.err);
          console.log(err.response.data.err);
        });
    } else if (formType === "login") {
      await axios
        .post(`${api_url}/login`, {
          email: values.email,
          password: values.password,
        })
        .then(async (res) => {
          let date = new Date();
          date.setDate(date.getDate() + 30);
          await setCookie("token", res.data.token, {
            sameSite: true,
            expires: date,
          });
          router.push("/store");
        })
        .catch((err) => {
          setErrorMessage(err.response.data.err);
        });
    }
  };

  return (
    <>
      <AuthForm style={{ filter: modalOpen ? "blur(3px)" : "none" }}>
        <h1>{formType === "register" ? "Register" : "Login"}</h1>
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
              {formType === "register" && (
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
                    {/*LINK NEEDS TO POINT TO TERMS AND CONDITIONS LATER*/}I
                    agree to the&nbsp;
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
                  {capitalized(formType)} error: {errorMessage}
                </ErrorMessage>
              </CSSTransition>
              <Button bold type="submit">
                {!isSubmitting ? (
                  formType === "register" ? (
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
      {modalOpen && (
        <Overlay>
          <StyledModal>
            <SvgWrapper>
              <MdEmail />
            </SvgWrapper>
            <h2>Check your inbox.</h2>
            <p>
              After you've verified your E-Mail address, you can start testing
              apps or upgrade your account to publish your own apps.
            </p>
            <Button
              transparent
              onClick={() => {
                setModalOpen(false);
                router.push("/store");
              }}
              onKeyDown={() => {
                setModalOpen(false);
                router.replace("/store");
              }}
              aria-label="Close Modal"
              tabIndex={0}
            >
              CLOSE
            </Button>
          </StyledModal>
        </Overlay>
      )}
    </>
  );
};
