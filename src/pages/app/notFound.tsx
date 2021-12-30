import { Button } from "components/Button";
import { motion } from "framer-motion";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

const NotFound: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>App Not Found | Testiply</title>
      </Head>
      The app you searched is doesn't exist.
      <Link href="/store">
        <Button>Go To Store</Button>
      </Link>
    </>
  );
};

export default NotFound;
