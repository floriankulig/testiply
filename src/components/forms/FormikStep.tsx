import { FormikConfig, FormikValues } from "formik"

export interface FormikStepProps extends Pick<FormikConfig<FormikValues>, "children" | "validationSchema"> { }

export const FormikStep = ({ children }: FormikStepProps) => {
    return (
        <>
            {children}
        </>
    )
}
