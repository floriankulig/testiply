import { TesterAuthForm } from "components/auth";
import { AuthLayout } from "components/layouts";
import { NextPage, NextPageContext } from "next";
import Head from "next/head";

interface RegisterProps {
  hasUser: boolean;
}

const Register: NextPage<RegisterProps> = () => {
  return (
    <>
      <Head>
        <title>Register | Testiply</title>
      </Head>
      <AuthLayout formType="register">
        <TesterAuthForm formType="register" />
      </AuthLayout>
    </>
  );
};

Register.getInitialProps = ({ res, req }: NextPageContext) => {
  const hasUser = !!req?.headers.cookie?.slice(3);
  if (res && hasUser) {
    res.writeHead(302, { Location: "/store" });
    res.end();
  }
  return { hasUser };
};

export default Register;
