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
  Description,
  IsSampleAppModal,
} from "components/appDetail";
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
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "components/Button";
import { BiMessageAltDetail } from "react-icons/bi";
import { FeedbackForm } from "components/forms";
import { useAuthValue } from "context";
import { fadeInOutVariants, fadeUpVariants } from "styles";

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
    devId,
    isSample,
    testflightIos,
    testflightIpados,
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
    currentUser &&
    !currentUser.downloadedApps?.find((app) => app.id === _id) &&
    !currentUser.downloadedApps?.find((app) => app.id === _id)
      ?.hasLeftFeedback &&
    !isSample;

  //event handlers
  const handleDownload = (): void => {
    if (isSample) {
      setSampleAppModalOpen(true);
      return;
    }
    if (downloadPlatform.id === "ios") {
      location.href = testflightIos;
    } else if (downloadPlatform.id === "ipados") {
      location.href = testflightIpados;
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
          <IconWrapper>
            {isSample && (
              <motion.div
                className="sample-badge"
                initial="closed"
                animate="open"
                variants={fadeInOutVariants}
                transition={{ delay: 0.5 }}
              >
                Sample
              </motion.div>
            )}
            <Image
              width={200}
              height={200}
              className="icon"
              src={`https://api.testiply.n-mayr.net/static/${_id}/icon.png`}
              alt={`${name} app icon`}
            />
          </IconWrapper>
          <MetaInfo>
            <h1>{name}</h1>
            <h3 className="link">
              <a
                href={`${devWebsite}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {devName}
              </a>
            </h3>
            <ClickableDropdown
              label="Download for "
              selection={downloadPlatform}
              setSelection={setDownloadPlatform}
              ctaClickHandler={handleDownload}
              values={downloadablePlatforms}
              style={{ visibility: !isMobile ? "visible" : "hidden" }}
            />
          </MetaInfo>
          <AnimatePresence>
            {sampleAppModalOpen && (
              <IsSampleAppModal setOpen={setSampleAppModalOpen} />
            )}
          </AnimatePresence>
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
        <motion.div
          initial="hidden"
          animate="show"
          transition={{
            delayChildren: 0.5,
            staggerChildren: 0.1,
          }}
        >
          <motion.h1 variants={fadeUpVariants} className="section-header">
            Description
          </motion.h1>
          <Description as={motion.p} variants={fadeUpVariants}>
            {description}
          </Description>
        </motion.div>
      </HeroSection>
      <ScreenshotSection
        as={motion.section}
        initial="hidden"
        animate="show"
        transition={{
          delayChildren: 0.7,
          staggerChildren: 0.1,
        }}
      >
        <motion.h1 variants={fadeUpVariants} className="section-header">
          Screenshots
        </motion.h1>
        <div className="screenshots">
          {[...Array(3)]?.map((_, i) => (
            <Screenshot
              as={motion.img}
              variants={fadeUpVariants}
              key={`screenshot_${_id}_${i}`}
              src={`https://api.testiply.n-mayr.net/static/${_id}/${i + 1}.png`}
              alt={`Screenshot ${i + 1} of ${name}`}
            />
          ))}
        </div>
      </ScreenshotSection>
      <RatingSection
        className="container-small"
        as={motion.section}
        initial="hidden"
        animate="show"
        transition={{
          delayChildren: 1,
          staggerChildren: 0.1,
        }}
      >
        {rating.total >= 1 && (
          <>
            <motion.h1 variants={fadeUpVariants} className="section-header">
              Rating
            </motion.h1>
            <RatingContent>
              <RatingSummary>
                <motion.h2 variants={fadeUpVariants}>{rating.total}</motion.h2>
                <StarPercentageRating percentage={rating.total} />
                <motion.span
                  variants={fadeUpVariants}
                  className="rating__amount"
                >
                  <IoPeople /> {rating.amount}
                </motion.span>
              </RatingSummary>
              <RatingBars>
                {[...Array(5)].map((_, i) => (
                  <RatingBar key={i} progress={rating[`${i + 1}`]} i={i} />
                ))}
              </RatingBars>
            </RatingContent>
          </>
        )}
        {feedbackFormOpen ? (
          <FeedbackForm
            appId={_id}
            appName={name}
            devId={devId}
            showsSampleInfo={isSample}
          />
        ) : (
          <div className="full-grid-width">
            {currentUser?._id === devId ? undefined : (
              <Button
                big
                bold
                onClick={() => setFeedbackFormOpen(true)}
                onKeyDown={() => setFeedbackFormOpen(true)}
                aria-label="Open Feedback Modal"
                tabIndex={0}
                disabled={cantLeaveFeedback}
                basic
                as={motion.button}
                variants={fadeUpVariants}
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
                  {rating.total < 1
                    ? "Be the first to leave your feedback"
                    : "Leave your feedback"}
                </motion.span>
              </Button>
            )}
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

  return {
    props: {
      appInfo,
    },
  };
};

export default AppDetail;
