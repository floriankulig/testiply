import getAppInfo from "api/getAppInfo";
import {
  FeedbackTile,
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
  Description,
  IsSampleAppModal,
} from "components/appDetail";
import { AppGrid } from "components/layouts";
import { capitalized, getTextColor } from "helpers";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";
import { App, Platform, platforms as allPlatforms } from "ts";
import { useState } from "react";
import { IoPeople } from "react-icons/io5";
import Image from "next/image";
import { ClickableDropdown } from "components/ClickableDropdown";
import { useIsMobile } from "hooks";
import { Footer } from "components/home";
import { theme } from "styles";
import { InfoPageHeader } from "components/InfoPageHeader";
import { motion } from "framer-motion";
import { Button } from "components/Button";
import { BiMessageAltDetail } from "react-icons/bi";
import { FeedbackForm } from "components/forms";
import { useAuthValue } from "context";

interface AppDetailProps {
  appInfo: App;
}

const AppDetail: NextPage<AppDetailProps> = ({
  appInfo: {
    name,
    description,
    platforms,
    rating,
    downloads,
    devName,
    devWebsite,
    isSample,
    testflightIos,
    testflightMacos,
    _id,
  },
}) => {
  //helper state
  const [feedbackFormOpen, setFeedbackFormOpen] = useState<boolean>(false);
  const [sampleAppModalOpen, setSampleAppModalOpen] = useState<boolean>(false);
  const { currentUser } = useAuthValue();
  const isMobile = useIsMobile(550);

  //platform availability filtering
  const downloadablePlatforms = platforms?.map((platformID) =>
    allPlatforms.find((p) => p.id === platformID)
  );
  const [downloadPlatform, setDownloadPlatform] = useState<Platform>(
    downloadablePlatforms[0]
  );

  //helper variables
  const cantLeaveFeedback =
    !currentUser?.ownedApps?.find((app) => app.id === _id) && !isSample;

  //event handlers
  const handleDownload = (): void => {
    if (isSample) {
      setSampleAppModalOpen(true);
      return;
    }
    if (downloadPlatform.id === "ios") {
      location.href = testflightIos;
    } else if (downloadPlatform.id === "macos") {
      location.href = testflightMacos;
    }
  };

  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          href="/favicons/favicon.ico"
          type="image/x-icon"
        />
        <title>{capitalized(name)} | Testiply</title>
      </Head>
      <InfoPageHeader
        className="container-small"
        style={{
          color: getTextColor(theme.layoutContentBg),
        }}
      />
      <HeroSection className="container-small">
        <StyledRow>
          <IconWrapper as={motion.div} layoutId={`appIcon-${_id}`}>
            <Image
              width={200}
              height={200}
              src={`https://api.testiply.n-mayr.net/static/${_id}/icon.png`}
              alt={`${name} app icon`}
            />
          </IconWrapper>
          <MetaInfo>
            <motion.h1 layoutId={`appTitle-${_id}`}>{name}</motion.h1>
            <motion.h3 layoutId={`appDevName-${_id}`} className="link">
              <a
                href={`http://${devWebsite}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {devName}
              </a>
            </motion.h3>
            <ClickableDropdown
              label="Download for "
              selection={downloadPlatform}
              setSelection={setDownloadPlatform}
              ctaClickHandler={handleDownload}
              values={downloadablePlatforms}
              style={{ visibility: !isMobile ? "visible" : "hidden" }}
            />
          </MetaInfo>
          {sampleAppModalOpen && (
            <IsSampleAppModal setOpen={setSampleAppModalOpen} />
          )}
        </StyledRow>
        <StyledRow>
          <ClickableDropdown
            label="Download for "
            selection={downloadPlatform}
            setSelection={setDownloadPlatform}
            values={downloadablePlatforms}
            ctaClickHandler={handleDownload}
            style={{
              width: "100%",
              visibility: isMobile ? "visible" : "hidden",
              marginBottom: !isMobile && "-5em",
            }}
          />
        </StyledRow>
        <motion.h1 animate className="section-header">
          Description
        </motion.h1>
        <Description as={motion.p} layoutId={`appDesc-${_id}`}>
          {description}
        </Description>
      </HeroSection>
      <ScreenshotSection>
        <motion.h1 animate className="section-header">
          Screenshots
        </motion.h1>
        <div className="screenshots">
          {[...Array(3)]?.map((_, i) => (
            <Screenshot
              key={`screenshot_${_id}_${i}`}
              src={`https://api.testiply.n-mayr.net/static/${_id}/${i + 1}.png`}
              alt={`Screenshot ${i + 1} of ${name}`}
              style={{ animationDelay: `${i * 30 + 500}ms` }}
            />
          ))}
        </div>
      </ScreenshotSection>
      <RatingSection className="container-small">
        {/* <motion.h1 animate className="section-header">Rating</motion.h1>
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
        </RatingContent> */}
        {feedbackFormOpen ? (
          <FeedbackForm appId={_id} appName={name} showsSampleInfo={isSample} />
        ) : (
          <div className="full-grid-width">
            <Button
              big
              bold
              onClick={() => setFeedbackFormOpen(true)}
              onKeyDown={() => setFeedbackFormOpen(true)}
              aria-label="Open Feedback Modal"
              tabIndex={0}
              disabled={cantLeaveFeedback}
              basic
            >
              <motion.span
                layoutId="leaveFeedbackHead"
                style={{
                  marginLeft: "40px",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <BiMessageAltDetail
                  style={{
                    position: "absolute",
                    left: "-45px",
                    width: "30px",
                    height: "30px",
                    marginRight: "1em",
                  }}
                />
                {rating < 1
                  ? "Be the first to leave your feedback"
                  : "Leave your feedback"}
              </motion.span>
            </Button>
          </div>
        )}
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
    props: {
      appInfo,
    },
  };
};

export default AppDetail;
