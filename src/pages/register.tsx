import { TesterAuthForm } from "components/auth";
import { AuthLayout } from "components/layouts";
import { NextPage } from "next";

const Register: NextPage = () => {
    return (
        <AuthLayout formType="register" >
            <TesterAuthForm formType="register" />
        </AuthLayout>
    )
}

export default Register