import { FormikStepper, AuthForm, FormikStep, FormikTextInput, FormikSelectionInput, FormikDateInput } from "components/forms";
import { AuthLayout } from "components/layouts";
import { FormikHelpers, FormikValues } from "formik";
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
    dateOfBirth: string;
    gender: Gender;
}

const DevRegister: NextPage = () => {
    const [showPasswords, setShowPasswords] = useState<boolean>(false);
    const inputsStacked = useIsMobile(720);

    const minBirthDate = new Date("1900-01-01")
    let maxBirthDate = new Date()
    maxBirthDate.setFullYear(maxBirthDate.getFullYear() - 10)

    const initialValues: FormValues = {
        email: "",
        password: "",
        confirmPassword: "",
        dateOfBirth: "",
        gender: "male",
    }

    const handleSubmit = (values: FormikValues, helpers: FormikHelpers<FormikValues>) => {
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
                        minLevel={0}
                    >
                        <FormikStep
                            validationSchema={Yup.object({
                                email: Yup.string().email('Invalid format').required('Required').min(3),
                                password: Yup.string().required('Required').min(8, "Has to be at least 8 characters"),
                                confirmPassword: Yup.string()
                                    .oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required')
                            })}
                        >
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
                                svgClickHandler={() => setShowPasswords(prev => !prev)}
                            />
                            <FormikTextInput
                                name="confirmPassword"
                                label="Confirm Password"
                                placeholder="Must be at least 8 characters"
                                type={showPasswords ? "text" : "password"}
                                svg={showPasswords ? <AiFillEyeInvisible /> : <AiFillEye />}
                                svgClickHandler={() => setShowPasswords(prev => !prev)}
                            />
                        </FormikStep>
                        <FormikStep
                            validationSchema={Yup.object({
                                gender: Yup.string().required('Required').oneOf(genders, "Must be one of: Male, Female, Other"),
                                dateOfBirth: Yup.string().required('Required')
                            })}
                        >
                            <FormikSelectionInput
                                values={genders}
                                label="Gender"
                                name="gender"
                            />
                            <FormikDateInput
                                name="dateOfBirth"
                                label="Date of Birth"
                                minDate={minBirthDate}
                                maxDate={maxBirthDate}
                            />
                        </FormikStep>
                    </FormikStepper>
                </AuthForm>
            </AuthLayout>
        </>
    )
}
export default DevRegister