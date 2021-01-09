import { AuthForm } from "components/auth";
import { AuthLayout } from "components/layouts";
import { NextPage } from "next";

const Register: NextPage = () => {
    return (
        <AuthLayout formType="register" >
            <AuthForm formType="login" />
        </AuthLayout>
    )
}

export default Register