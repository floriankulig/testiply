import { FormikValues } from "formik";
import { FormikStepper } from "./FormikStepper";
import * as Yup from "yup";
import { PlatformID, CategoryID } from "ts/types";
import { FormikStep, FormikTextInput } from ".";
import { FormikTextArea } from "./FormikTextArea";
import { FormikTypedDropdown } from "./FormikTypedDropdown";
import { categories, platforms } from "ts";

const availablePlatforms = platforms.filter(
  (plat) => plat.id === "ios" || plat.id === "macos"
);

interface FormValues {
  name: string;
  description: string;
  platforms: PlatformID[];
  categories: CategoryID[];
  testflightLink: string;
}

const initialValues: FormValues = {
  name: "",
  description: "",
  platforms: [],
  categories: [],
  testflightLink: "",
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
  testflightLink: Yup.string().required("Required"),
});
const metaValidationSchema = Yup.object({
  platforms: Yup.array().of(Yup.string()).required(),
  categories: Yup.array().of(Yup.string()).required(),
});

export const PublishAppForm: React.FC = () => {
  const handleSubmit = async (values: FormikValues) => {
    console.log({ values });
  };

  return (
    <FormikStepper
      lastButtonText="Publish"
      initialValues={initialValues}
      onSubmit={async (values) => await handleSubmit(values)}
    >
      {}
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
        <FormikTextInput
          name="testflightLink"
          label="TestFlight Link"
          placeholder="Provide your TestFlight link"
        />
      </FormikStep>
      <FormikStep validationSchema={metaValidationSchema}>
        <FormikTypedDropdown
          name="categories"
          label="Categories"
          placeholder="Name your app's categories"
          values={categories}
        />
      </FormikStep>
    </FormikStepper>
  );
};
