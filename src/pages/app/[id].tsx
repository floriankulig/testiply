import getAppInfo from "api/getAppInfo";
import { Screenshot, ScreenshotSection } from "components/appDetail";
import { SingleColumnLayout } from "components/layouts";
import { capitalized } from "helpers";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";
import { App } from "ts";

interface AppDetailProps {
  appInfo: App;
}

const AppDetail: NextPage<AppDetailProps> = ({
  appInfo: {
    name,
    description,
    website,
    platforms,
    screenshots,
    rating,
    downloads,
    devId,
    devName,
    _id,
  },
}) => {
  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          href="/favicons/favicon.ico"
          type="image/x-icon"
        />
        <title>{capitalized(name)} | Beta App Store</title>
      </Head>
      <SingleColumnLayout>
        <ScreenshotSection>
          <h3>Screenshots</h3>
          <div className="screenshots">
            {screenshots?.map((screenshot, i) => (
              <Screenshot
                key={`screenshot_${_id}_${i}`}
                src={`https://media.beta-app-store.com/apps/screenshots/${_id}/${screenshot}`}
                alt={`Screenshot ${i + 1} of ${name}`}
                style={{ animationDelay: `${i * 30 + 500}ms` }}
              />
            ))}
          </div>
        </ScreenshotSection>
      </SingleColumnLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const id = ctx?.params.id as string;
  const appInfo = await getAppInfo(id);

  return {
    props: { appInfo },
  };
};

export default AppDetail;
