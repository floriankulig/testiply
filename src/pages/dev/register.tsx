import { DevAuthForm } from "components/auth";
import { AuthLayout } from "components/layouts";
import { useAuthValue } from "context";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

const DevRegister: NextPage = () => {
  const { currentUser, canHaveUser } = useAuthValue();
  const router = useRouter();

  useEffect(() => {
    if (canHaveUser && !!currentUser?.isDev) router.push("/store");
  }, [currentUser, canHaveUser]);

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
