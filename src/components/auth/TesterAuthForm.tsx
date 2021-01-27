import { Button } from "components/Button";
import { AuthForm, FormikSelectionInput, FormikTextInput } from "components/forms";
import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { FormType } from "ts"
import { Form, Formik, FormikHelpers, FormikValues } from "formik"
import * as Yup from 'yup';
import { useIsMobile } from "hooks";
import Link from "next/link";
import { theme } from "styles";
import { InfoCard } from "components/InfoCard";

interface TesterAuthFormProps {
    formType: FormType;
}

interface FormValues {
    email: string;
    password: string;
    confirmPassword?: string;
}


export const TesterAuthForm: React.FC<TesterAuthFormProps> = ({ formType }) => {
    const [showPasswords, setShowPasswords] = useState<boolean>(false);

    const initialValues: FormValues = formType === "login" ? {
        email: "",
        password: "",
    } : {
            email: "",
            password: "",
            confirmPassword: "",
        }

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid format').required('Required').min(3),
        password: Yup.string().required('Required').min(8, "Has to be at least 8 characters"),
        confirmPassword: (formType === "register" ? Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required') : undefined)
    })

    const handleSubmit = (values: FormikValues, helpers: FormikHelpers<FormikValues>) => {
        console.log(values)
    }

    return (
        <>
            <AuthForm>
                <h1>{formType === "register" ?
                    "Register" : "Login"}
                </h1>
                <Formik
                    initialValues={initialValues}
                    onSubmit={async (values, helpers) => await handleSubmit(values, helpers)}
                    validationSchema={validationSchema}
                >
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
                            svgClickHandler={() => setShowPasswords(prev => !prev)}
                        />
                        {formType === "register" && (
                            <FormikTextInput
                                name="confirmPassword"
                                label="Confirm Password"
                                placeholder="Must be at least 8 characters"
                                type={showPasswords ? "text" : "password"}
                                svg={showPasswords ? <AiFillEyeInvisible /> : <AiFillEye />}
                                svgClickHandler={() => setShowPasswords(prev => !prev)}
                            />
                        )}
                        <Button bold type="submit">{formType === "register" ? "Register" : "Log In"}</Button>
                    </Form>
                </Formik>
            </AuthForm>
        </>
    )
}