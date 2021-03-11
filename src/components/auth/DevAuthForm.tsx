import { Button } from "components/Button";
import {
  AuthForm,
  FormikCheckbox,
  FormikStep,
  FormikStepper,
  FormikTextInput,
} from "components/forms";
import { Overlay } from "components/Overlay";
import { SpaceBetween } from "components/SpaceBetweenRow";
import { FormikValues } from "formik";
import { motion } from "framer-motion";
import { useOnClickOutside } from "hooks";
import Link from "next/link";
import { useRef, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { FaUser, FaGlobe } from "react-icons/fa";
import styled from "styled-components";
import * as Yup from "yup";

const RemoveButtonRowStyles = styled.div`
  ${Button} {
    margin: 0;
  }
`;

const baseValidationSchema = Yup.object({
  email: Yup.string().email("Invalid format").required("Required").min(3),
  password: Yup.string()
    .required("Required")
    .min(8, "Has to be at least 8 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});
const metaValidationSchema = Yup.object({
  name: Yup.string()
    .required("Required")
    .min(2, "Has to be at least 2 characters")
    .max(64, "Can't be longer than 64 characters"),
  website: Yup.string()
    .required("Required")
    .min(2, "Has to be at least 2 characters"),
  acceptedTAS: Yup.boolean().oneOf([true]),
});

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  website: string;
  acceptedTAS: boolean;
}

interface DevAuthFormProps {
  hasUserRegistered?: boolean;
  asModal?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DevAuthForm: React.FC<DevAuthFormProps> = ({
  hasUserRegistered,
  asModal,
  setOpen,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [showPasswords, setShowPasswords] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  if (asModal) {
    useOnClickOutside(ref, () => setOpen(false));
  }

  const initialValues: FormValues = {
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    website: "",
    acceptedTAS: false,
  };

  const handleSubmit = async (values: FormikValues) => {
    console.log(values);
  };

  const body = (
    <AuthForm
      ref={ref}
      as={motion.div}
      layoutId="authForm"
      style={{ borderRadius: "4em" }}
    >
      <RemoveButtonRowStyles>
        <SpaceBetween>
          <h1>
            {hasUserRegistered
              ? "Upgrade to a Publisher-Account"
              : "Register as a Publisher"}
          </h1>
        </SpaceBetween>
        <FormikStepper
          errorMsg={errorMessage}
          setErrorMsg={setErrorMessage}
          lastButtonText="Register"
          initialValues={initialValues}
          minLevel={hasUserRegistered ? 1 : 0}
          onSubmit={async (values) => await handleSubmit(values)}
        >
          <FormikStep validationSchema={baseValidationSchema}>
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
            <FormikTextInput
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Must be at least 8 characters"
              type={showPasswords ? "text" : "password"}
              svg={showPasswords ? <AiFillEyeInvisible /> : <AiFillEye />}
              svgClickHandler={() => setShowPasswords((prev) => !prev)}
            />
          </FormikStep>
          <FormikStep validationSchema={metaValidationSchema}>
            <FormikTextInput
              name="name"
              label="Name"
              placeholder="Provide your (company) name"
              svg={<FaUser />}
              svgClickHandler={() => setShowPasswords((prev) => !prev)}
            />
            <FormikTextInput
              name="website"
              label="Website"
              placeholder="Provide your personal/company website"
              svg={<FaGlobe />}
            />
            <FormikCheckbox name="acceptedTAS">
              {/*LINK NEEDS TO POINT TO TERMS AND CONDITIONS LATER*/}I agree to
              the&nbsp;
              <Link href="/register">
                <span className="link">Terms and Conditions</span>
              </Link>
            </FormikCheckbox>
          </FormikStep>
        </FormikStepper>
      </RemoveButtonRowStyles>
    </AuthForm>
  );

  if (asModal) {
    return <Overlay>{body}</Overlay>;
  } else {
    return <>{body}</>;
  }
};
