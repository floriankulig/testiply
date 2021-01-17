import { TesterAuthForm } from "components/auth";
import { AuthLayout } from "components/layouts";
import { NextPage } from "next";
import Head from "next/head";

const Register: NextPage = () => {
    return (
        <>
            <Head>
                <title>Register | Beta App Store</title>
            </Head>
            <AuthLayout formType="register" >
                <TesterAuthForm formType="register" />
            </AuthLayout>
        </>
    )
}

export default Register