import { AuthForm, FormikStep, TextField } from "components/forms";
import { FormikStepper } from "components/forms";
import { AuthLayout } from "components/layouts";
import { Field, FormikHelpers, FormikValues } from "formik";
import { useIsMobile } from "hooks";
import { NextPage } from "next";
import Head from "next/head";
import { Gender, genders } from "ts";
import { object, string } from "yup";

interface FormValues {
    email: string;
    password: string;
    confirmPassword: string;
    dateOfBirth: Date | null;
    gender: Gender;
}

const DevRegister: NextPage = () => {
    const inputsStacked = useIsMobile(720);

    const initialValues: FormValues = {
        email: "",
        password: "",
        confirmPassword: "",
        dateOfBirth: null,
        gender: "male",
    }

    const handleSubmit = async (values: FormikValues, helpers: FormikHelpers<FormikValues>) => {
        console.log(values)
    }

    return (
        <>
            <Head>
                <title>Register as a Dev | Beta App Store</title>
            </Head>
            <AuthLayout formType="dev_register">
                <AuthForm>
                    <h1>Sign Up As A Dev</h1>
                    <FormikStepper
                        initialValues={initialValues}
                        onSubmit={(values, helpers) => handleSubmit(values, helpers)}
                    >
                        <FormikStep
                            validationSchema={object({
                                email: string().required().min(2).max(5)
                            })}
                        >
                            <Field name="email" placeholder="Email" />
                        </FormikStep>
                        <FormikStep
                            validationSchema={object({
                                password: string().required().min(4).max(5)
                            })}
                        >
                            <Field name="password" placeholder="password" />
                        </FormikStep>
                        <FormikStep>
                            <Field name="confirmPassword" placeholder="confirm password" />
                        </FormikStep>
                    </FormikStepper>
                </AuthForm>
            </AuthLayout>
        </>
    )
}
export default DevRegister