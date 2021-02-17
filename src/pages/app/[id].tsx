import getAppInfo from "api/getAppInfo";
import {
  HeroSection,
  IconWrapper,
  MetaInfo,
  RatingBar,
  RatingBars,
  RatingContent,
  RatingSection,
  RatingSummary,
  Screenshot,
  ScreenshotSection,
  StarPercentageRating,
  StyledRow,
} from "components/appDetail";
import { SingleColumnLayout } from "components/layouts";
import { capitalized } from "helpers";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";
import { App, Platform, platforms } from "ts";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoPeople } from "react-icons/io5";
import { ClickableDropdown } from "components/ClickableDropdown";
import { useIsMobile } from "hooks";

interface AppDetailProps {
  appInfo: App;
}

const AppDetail: NextPage<AppDetailProps> = ({
  appInfo: {
    name,
    description,
    website,
    // platforms,
    screenshots,
    rating,
    downloads,
    devId,
    devName,
    _id,
  },
}) => {
  const [downloadPlatform, setDownloadPlatform] = useState<Platform>(
    platforms[0]
  );
  const isMobile = useIsMobile(550);

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
        <HeroSection className="container">
          <StyledRow>
            <IconWrapper>
              <Image
                width={200}
                height={200}
                src={`https://media.beta-app-store.com/apps/icon/${_id}.webp`}
                alt={`${name} app icon`}
              />
            </IconWrapper>
            <MetaInfo>
              <h1>{name}</h1>
              <Link href={`/dev/${devId}`}>
                <h3 className="link">{devName}</h3>
              </Link>
              <ClickableDropdown
                label="Download for "
                selection={downloadPlatform}
                setSelection={setDownloadPlatform}
                values={platforms}
                style={{ visibility: !isMobile ? "visible" : "hidden" }}
              />
            </MetaInfo>
          </StyledRow>
          <StyledRow>
            <ClickableDropdown
              label="Download for "
              selection={downloadPlatform}
              setSelection={setDownloadPlatform}
              values={platforms}
              style={{
                width: "100%",
                visibility: isMobile ? "visible" : "hidden",
              }}
            />
          </StyledRow>
        </HeroSection>
        <ScreenshotSection>
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
        <RatingSection className="container">
          <h1 className="section-header">Rating & Feedback</h1>
          <RatingContent>
            <RatingSummary>
              <h2>{rating}</h2>
              <StarPercentageRating percentage={rating} />
              <span className="rating__amount">
                <IoPeople /> 1.065.564
              </span>
            </RatingSummary>
            <RatingBars>
              {["", "", "", "", ""].map((_, i) => (
                <RatingBar key={i} progress={i / 5} i={i} />
              ))}
            </RatingBars>
          </RatingContent>
        </RatingSection>
      </SingleColumnLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const id = ctx?.params.id as string;
  const appInfo = await getAppInfo(id);
  console.log(appInfo);

  return {
    props: { appInfo },
  };
};

export default AppDetail;
