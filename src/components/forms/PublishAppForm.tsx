import { FormikValues } from "formik";
import { FormikStepper } from "./FormikStepper";
import * as Yup from "yup";
import { PlatformID, CategoryID } from "ts/types";
import { FormikStep, FormikTextInput } from ".";
import { FormikTextArea } from "./FormikTextArea";
import { FormikTypedDropdown } from "./FormikTypedDropdown";
import { categories, platforms } from "ts";
import { useState } from "react";
import { useAuthValue } from "context";
import { DevAuthForm, TesterAuthForm } from "components/auth";
import { useCannotScroll } from "hooks";

interface FormValues {
  name: string;
  description: string;
  platforms: PlatformID[];
  categories: CategoryID[];
  testflightIos: string;
  testflightMacos: string;
}

const initialValues: FormValues = {
  name: "",
  description: "",
  platforms: [],
  categories: [],
  testflightIos: "",
  testflightMacos: "",
};

const baseValidationSchema = Yup.object({
  name: Yup.string()
    .required("Required")
    .min(2, "Must be at least 2 characters")
    .max(30, "Can't be longer than 30 characters"),
  description: Yup.string()
    .required("Required")
    .min(150, "Must be at least 150 characters")
    .max(1028, "Can't be longer than 1028 characters"),
});
const metaValidationSchema = Yup.object({
  testflightIos: Yup.string(),
  testflightMacos: Yup.string(),
  categories: Yup.array()
    .of(Yup.object().shape({ id: Yup.string(), displayName: Yup.string() }))
    .min(1, "Must select at least 1 category")
    .max(4, "Can't select more than 4 categories"),
});

export const PublishAppForm: React.FC = () => {
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const [devModalOpen, setDevModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { currentUser } = useAuthValue();
  useCannotScroll(loginModalOpen || devModalOpen);

  const handleSubmit = async (values: FormikValues) => {
    setErrorMessage("");
    if (!values.testflightIos && !values.testflightMacos) {
      setErrorMessage("Must provide at least one TestFlight link.");
      return;
    }
    if (!currentUser) {
      setLoginModalOpen(true);
      return;
    } else if (!currentUser.is_dev) {
      setDevModalOpen(true);
      return;
    }
    console.log({ values });
  };

  return (
    <>
      <FormikStepper
        lastButtonText="Publish"
        initialValues={initialValues}
        onSubmit={async (values) => await handleSubmit(values)}
        errorMsg={errorMessage}
        setErrorMsg={setErrorMessage}
      >
        <FormikStep validationSchema={baseValidationSchema}>
          <FormikTextInput
            name="name"
            label="App Name"
            placeholder="Name your app"
          />
          <FormikTextArea
            name="description"
            label="Description"
            placeholder="Describe your app's functionality"
          />
        </FormikStep>
        <FormikStep validationSchema={metaValidationSchema}>
          <FormikTypedDropdown
            name="categories"
            label="Categories"
            placeholder="Name your app's categories"
            values={categories}
            maxValues={4}
          />
          <FormikTextInput
            name="testflightIos"
            label="TestFlight Link for iOS"
            placeholder="Provide your TestFlight link for iOS"
          />
          <FormikTextInput
            name="testflightMacos"
            label="TestFlight Link for MacOS"
            placeholder="Provide your TestFlight link for MacOS"
          />
        </FormikStep>
      </FormikStepper>

      {loginModalOpen && (
        <TesterAuthForm formType="login" asModal setOpen={setLoginModalOpen} />
      )}
      {devModalOpen && (
        <DevAuthForm hasUserRegistered asModal setOpen={setLoginModalOpen} />
      )}
    </>
  );
};
