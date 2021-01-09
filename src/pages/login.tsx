import { AuthForm } from "components/auth";
import { AuthLayout } from "components/layouts";
import { NextPage } from "next";

const Login: NextPage = () => {
    return (
        <AuthLayout formType="login" >
            <AuthForm formType="login" />
        </AuthLayout>
    )
}

export default Login