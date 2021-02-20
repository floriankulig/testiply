import Head from "next/head";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { api_url } from "ts/constants";
import { GoVerified } from "react-icons/go";
import { MdError } from "react-icons/md";
import { postData } from "api";
import styled from "styled-components";
import { Button } from "components/Button";
import Link from "next/link";
import { SingleColumnLayout } from "components/layouts";

interface ContentContainerProps {
  hasError: boolean;
}

const ContentContainer = styled.div<ContentContainerProps>`
  min-height: calc(100vh - var(--header-height) - 540px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 5em;

  h1 {
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    @media (${({ theme }) => theme.bp.small}) {
      flex-direction: row;
    }
    margin: 0;
    margin-bottom: 1em;
    color: ${(p) => (p.hasError ? "red" : "#2ba526")};
    font-size: 3rem;

    svg {
      margin: 0;
      @media (${({ theme }) => theme.bp.small}) {
        margin-right: 0.5em;
      }
    }
  }
`;

interface PageProps {
  success: boolean;
}

const Verify: NextPage<PageProps> = ({ success }) => {
  return (
    <>
      <Head>
        <title>Verify | Testiply</title>
      </Head>
      <SingleColumnLayout>
        <ContentContainer hasError={!success} className="container">
          <h1>
            {success ? <GoVerified /> : <MdError />}
            {success ? "You are now verified" : "Your Verification failed."}
          </h1>
          {success ? (
            <Link href="/store">
              <Button big bold>
                Go to Store
              </Button>
            </Link>
          ) : (
            <a href="mailto:support@beta-app-store.com?subject=Verfication%20Error">
              <Button big bold color={"red"} basic>
                Contact our Support
              </Button>
            </a>
          )}
        </ContentContainer>
      </SingleColumnLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context.query.id;
  let isSuccess: boolean = true;
  await postData(`${api_url}/verify`, { id }).catch(() => {
    isSuccess = false;
  });

  return {
    props: {
      success: isSuccess,
    },
  };
};

export default Verify;
