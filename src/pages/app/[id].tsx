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
import { AppGrid } from "components/layouts";
import { capitalized, getTextColor } from "helpers";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";
import { App, Platform, platforms } from "ts";
import { useState } from "react";
import Image from "next/image";
import { IoPeople } from "react-icons/io5";
import { ClickableDropdown } from "components/ClickableDropdown";
import { useIsMobile } from "hooks";
import { Footer } from "components/home";
import { theme } from "styles";
import { InfoPageHeader } from "components/InfoPageHeader";

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
    devWebsite,
    _id,
  },
}) => {
  const [downloadPlatform, setDownloadPlatform] = useState<Platform>(
    platforms[0]
  );
  const isMobile = useIsMobile(550);

  const handleDownload = (): void => {
    console.log(`Downloaded for ${downloadPlatform.displayName}`);
  };

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
      <InfoPageHeader
        className="container-small"
        style={{
          color: getTextColor(theme.layoutContentBg),
        }}
      />
      <HeroSection className="container-small">
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
            <a
              href={`http://${devWebsite}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3 className="link">{devName}</h3>
            </a>
            <ClickableDropdown
              label="Download for "
              selection={downloadPlatform}
              setSelection={setDownloadPlatform}
              ctaClickHandler={handleDownload}
              values={platforms.slice(0, platforms.length - 1)}
              style={{ visibility: !isMobile ? "visible" : "hidden" }}
            />
          </MetaInfo>
        </StyledRow>
        <StyledRow>
          <ClickableDropdown
            label="Download for "
            selection={downloadPlatform}
            setSelection={setDownloadPlatform}
            values={platforms.slice(0, platforms.length - 1)}
            ctaClickHandler={handleDownload}
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
      <RatingSection className="container-small">
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
        <AppGrid>Hello</AppGrid>
      </RatingSection>
      <Footer />
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
