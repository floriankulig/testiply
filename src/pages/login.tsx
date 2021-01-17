import { TesterAuthForm } from "components/auth";
import { AuthLayout } from "components/layouts";
import { NextPage } from "next";
import Head from "next/head";

const Login: NextPage = () => {
    return (
        <>
            <Head>
                <title>Login | Beta App Store</title>
            </Head>
            <AuthLayout formType="login" >
                <TesterAuthForm formType="login" />
            </AuthLayout>
        </>
    )
}

export default Login