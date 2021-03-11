import { DevAuthForm } from "components/auth";
import { AuthLayout } from "components/layouts";
import { NextPage } from "next";
import Head from "next/head";

const DevRegister: NextPage = () => {
  return (
    <>
      <Head>
        <title>Register as a Publisher | Testiply</title>
      </Head>
      <AuthLayout formType="dev_register">
        <DevAuthForm />
      </AuthLayout>
    </>
  );
};

export default DevRegister;
