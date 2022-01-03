import { FormikValues } from "formik";
import { FormikStepper } from "./FormikStepper";
import * as Yup from "yup";
import {
  FormikStep,
  FormikTextInput,
  FormikFileUpload,
  FormikTextArea,
  FormikTypedDropdown,
} from ".";
import { categories, CategoryID } from "ts";
import { useState } from "react";
import { useAuthValue } from "context";
import { DevAuthForm, TesterAuthForm } from "components/auth";
import { useCannotScroll } from "hooks";
import { createApp } from "api";
import { Router, useRouter } from "next/router";

interface FormValues {
  name: string;
  description: string;
  categories: CategoryID[];
  screenshots: File[];
  icon: File[];
  testflightIos: string;
  testflightIpados: string;
}

const initialValues: FormValues = {
  name: "",
  description: "",
  categories: [],
  screenshots: [],
  icon: [],
  testflightIos: "",
  testflightIpados: "",
};

const baseValidationSchema = Yup.object({
  name: Yup.string()
    .required("Required")
    .min(2, "Must be at least 2 characters")
    .max(25, "Can't be longer than 25 characters"),
  description: Yup.string()
    .required("Required")
    .min(150, "Must be at least 150 characters")
    .max(750, "Can't be longer than 750 characters"),
});
const metaValidationSchema = Yup.object({
  testflightIos: Yup.string(),
  testflightMacos: Yup.string(),
  categories: Yup.array()
    .of(Yup.object().shape({ id: Yup.string(), displayName: Yup.string() }))
    .min(1, "Must select at least 1 category")
    .max(4, "Can't select more than 4 categories"),
});

const fileValidationSchema = Yup.object({
  icon: Yup.array()
    .min(1, "Must select an icon")
    .max(1, "Can't select more than one icon"),
  screenshots: Yup.array()
    .min(3, "Must select 3 screenshots")
    .max(3, "Can't select more than 3 screenshots"),
});

export const PublishAppForm: React.FC = () => {
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const [devModalOpen, setDevModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();
  const { currentUser } = useAuthValue();
  useCannotScroll(loginModalOpen || devModalOpen);

  const handleSubmit = async (values: FormikValues) => {
    setErrorMessage("");
    if (!values.testflightIos && !values.testflightIpados) {
      setErrorMessage("Must provide at least one TestFlight link.");
      return;
    }
    if (!currentUser) {
      setLoginModalOpen(true);
      return;
    } else if (!currentUser.isDev) {
      setDevModalOpen(true);
      return;
    }

    await createApp(currentUser, values, setErrorMessage).then((appId) =>
      router.push(`/app/${appId}`)
    );
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
        <FormikStep validationSchema={fileValidationSchema}>
          <FormikFileUpload label="App Icon" maxFiles={1} name="icon" />
          <FormikFileUpload
            label="Screenshots"
            maxFiles={3}
            name="screenshots"
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
            name="testflightIpados"
            label="TestFlight Link for iPadOS"
            placeholder="Provide your TestFlight link for iPadOS"
          />
        </FormikStep>
      </FormikStepper>

      {loginModalOpen && (
        <TesterAuthForm formType="login" asModal setOpen={setLoginModalOpen} />
      )}
      {devModalOpen && (
        <DevAuthForm hasUserRegistered asModal setOpen={setDevModalOpen} />
      )}
    </>
  );
};
