import { Button } from "components/Button";
import { AuthForm, FormikTextInput } from "components/forms";
import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { FormType } from "ts"
import { Form, Formik, FormikHelpers, FormikValues } from "formik"
import * as Yup from 'yup';
import { FormikCheckbox } from "components/forms/FormikCheckbox";
import Link from "next/link";

interface TesterAuthFormProps {
    formType: FormType;
}

interface FormValues {
    email: string;
    password: string;
    confirmPassword?: string;
    acceptedTAS?: boolean
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
            acceptedTAS: false
        }

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid format').required('Required').min(3),
        password: Yup.string().required('Required').min(8, "Has to be at least 8 characters"),
        confirmPassword: (formType === "register" ? Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required') : undefined),
        acceptedTAS: (formType === "register" ? Yup.boolean().oneOf([true]) : undefined),
    })

    const handleSubmit = (values: FormikValues) => {
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
                    onSubmit={async (values) => await handleSubmit(values)}
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
                            <>
                                <FormikTextInput
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    placeholder="Must be at least 8 characters"
                                    type={showPasswords ? "text" : "password"}
                                    svg={showPasswords ? <AiFillEyeInvisible /> : <AiFillEye />}
                                    svgClickHandler={() => setShowPasswords(prev => !prev)}
                                />
                                <FormikCheckbox name="acceptedTAS">
                                    {/*LINK NEEDS TO POINT TO TERMS AND CONDITIONS LATER*/}
                                    I agree to the&nbsp;<Link href="/register"><span className="link">Terms and Conditions</span></Link>
                                </FormikCheckbox>
                            </>
                        )}
                        <Button bold type="submit">{formType === "register" ? "Register" : "Log In"}</Button>
                    </Form>
                </Formik>
            </AuthForm>
        </>
    )
}