import { TesterAuthForm } from "components/auth";
import { AuthLayout } from "components/layouts";
import { NextPage } from "next";

const Login: NextPage = () => {
    return (
        <AuthLayout formType="login" >
            <TesterAuthForm formType="login" />
        </AuthLayout>
    )
}

export default Login