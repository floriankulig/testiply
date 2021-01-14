import { DevRegisterForm } from "components/auth";
import { AuthLayout } from "components/layouts";
import { NextPage } from "next";

const DevRegister: NextPage = () => {
    return (
        <AuthLayout formType="dev_register">
            <DevRegisterForm />
        </AuthLayout>
    )
}

export default DevRegister