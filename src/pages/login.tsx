import { TesterAuthForm } from "components/auth";
import { AuthLayout } from "components/layouts";
import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

interface LoginProps {
  hasUser: boolean;
}

const Login: NextPage<LoginProps> = ({ hasUser }) => {
  const router = useRouter();
  if (typeof window !== "undefined" && hasUser) {
    router.push("/store");
  }

  return (
    <>
      <Head>
        <title>Login | Testiply</title>
      </Head>
      <AuthLayout formType="login">
        <TesterAuthForm formType="login" />
      </AuthLayout>
    </>
  );
};

Login.getInitialProps = ({ res, req }: NextPageContext) => {
  const hasUser = !!req?.headers.cookie?.slice(3);
  if (res && hasUser) {
    res.writeHead(302, { Location: "/store" });
    res.end();
  }
  return { hasUser };
};

export default Login;
