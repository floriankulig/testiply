import { AuthForm, FormikStep, TextField, TextInput } from "components/forms";
import { FormikStepper } from "components/forms";
import { AuthLayout } from "components/layouts";
import { Field, FormikHelpers, FormikValues } from "formik";
import { useIsMobile } from "hooks";
import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { Gender, genders } from "ts";
import * as Yup from 'yup';

interface FormValues {
    email: string;
    password: string;
    confirmPassword: string;
    dateOfBirth: Date | null;
    gender: Gender;
}

const DevRegister: NextPage = () => {
    const [showPasswords, setShowPasswords] = useState<boolean>(false);
    const inputsStacked = useIsMobile(720);

    const initialValues: FormValues = {
        email: "",
        password: "",
        confirmPassword: "",
        dateOfBirth: null,
        gender: "male",
    }

    const handleSubmit = (values: FormikValues, helpers: FormikHelpers<FormikValues>): boolean => {
        console.log(values)
    }

    return (
        <>
            <Head>
                <title>Register as a Dev | Beta App Store</title>
            </Head>
            <AuthLayout formType="dev_register">
                <AuthForm>
                    <h1>Sign Up as a Dev</h1>
                    <FormikStepper
                        initialValues={initialValues}
                        onSubmit={(values, helpers) => handleSubmit(values, helpers)}
                    >
                        <FormikStep
                            validationSchema={Yup.object({
                                email: Yup.string().required().min(3),
                                password: Yup.string().required('Password is required'),
                                confirmPassword: Yup.string()
                                    .oneOf([Yup.ref('password'), null], 'Passwords must match')
                            })}
                        >
                            <TextInput
                                svg={<MdEmail />}
                                name="email"
                                label="E-Mail Address"
                                placeholder="Enter your E-Mail Address"
                            />
                            <TextInput
                                name="password"
                                label="Password"
                                placeholder="Must be at least 8 characters"
                                type={showPasswords ? "text" : "password"}
                                svg={showPasswords ? <AiFillEyeInvisible /> : <AiFillEye />}
                                svgClickHandler={() => setShowPasswords(prev => !prev)}
                            />
                            <TextInput
                                name="confirmPassword"
                                label="Confirm Password"
                                placeholder="Must be at least 8 characters"
                                type={showPasswords ? "text" : "password"}
                                svg={showPasswords ? <AiFillEyeInvisible /> : <AiFillEye />}
                                svgClickHandler={() => setShowPasswords(prev => !prev)}
                            />
                        </FormikStep>
                        <FormikStep
                        >
                            <TextInput
                                svg={<MdEmail />}
                                name="gender"
                                label="gender"
                                placeholder="Enter your gender"
                            />
                        </FormikStep>
                    </FormikStepper>
                </AuthForm>
            </AuthLayout>
        </>
    )
}
export default DevRegister