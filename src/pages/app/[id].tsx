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
import { useRef, useState } from "react";
import { IoPeople } from "react-icons/io5";
import Image from "next/image";
import { ClickableDropdown } from "components/ClickableDropdown";
import { useHorizontalScroll, useIsMobile } from "hooks";
import { Footer } from "components/home";
import { theme } from "styles";
import { InfoPageHeader } from "components/InfoPageHeader";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "components/Button";
import { BiMessageAltDetail } from "react-icons/bi";
import { FeedbackForm } from "components/forms";
import { useAuthValue } from "context";
import { fadeInOutVariants, fadeUpVariants } from "styles";
import { TesterAuthForm } from "components/auth";
import axios from "axios";

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
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [ctaLoading, setCTALoading] = useState<boolean>(false);
  const { currentUser, renewUid } = useAuthValue();
  const isMobile = useIsMobile(550);

  const screenshotsParentRef = useRef<HTMLHeadingElement>(null);
  const screenshotsListRef = useRef<HTMLUListElement>(null);
  const { scrollable } = useHorizontalScroll(
    screenshotsParentRef.current,
    screenshotsListRef.current
  );
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
  const handleDownload = async (): Promise<void> => {
    setCTALoading(true);
    if (isSample) {
      setSampleAppModalOpen(true);
      setCTALoading(false);
      return;
    }
    if (!currentUser) {
      setAuthModalOpen(true);
      setCTALoading(false);
      return;
    }
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/download?appId=${_id}&userId=${currentUser._id}`
      );
      await renewUid(currentUser._id);
      if (downloadPlatform.id === "ios") {
        location.href = testflightIos;
      } else if (downloadPlatform.id === "ipados") {
        location.href = testflightIpados;
      }
    } catch (err) {}
    setCTALoading(false);
  };

  return (
    <div style={{ maxWidth: "100vw", overflowX: "hidden" }}>
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
              loading={ctaLoading}
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
            loading={ctaLoading}
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
        className="container-small"
        as={motion.section}
        initial="hidden"
        animate="show"
        transition={{
          delayChildren: 0.7,
          staggerChildren: 0.1,
        }}
      >
        <motion.h1
          ref={screenshotsParentRef}
          variants={fadeUpVariants}
          className="section-header"
        >
          Screenshots
        </motion.h1>
        <motion.ul
          className="screenshots"
          animate={{ x: !scrollable && 0 }}
          drag={scrollable ? "x" : false}
          dragConstraints={screenshotsParentRef}
          dragTransition={{
            bounceStiffness: 400,
            bounceDamping: 50,
          }}
          ref={screenshotsListRef}
        >
          {[...Array(3)]?.map((_, i) => (
            <Screenshot
              as={motion.img}
              variants={fadeUpVariants}
              key={`screenshot_${_id}_${i}`}
              src={`${process.env.NEXT_PUBLIC_API_URL}/static/${_id}/${
                i + 1
              }.png`}
              alt={`Screenshot ${i + 1} of ${name}`}
            />
          ))}
        </motion.ul>
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
      {authModalOpen && (
        <TesterAuthForm formType="login" asModal setOpen={setAuthModalOpen} />
      )}
      <Footer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  res,
  params,
}: GetServerSidePropsContext) => {
  const id = params.id as string;
  try {
    const appInfo = await getAppInfo(id);
    return {
      props: {
        appInfo,
      },
    };
  } catch (err) {
    res.writeHead(302, { Location: "/app/notFound" });
    res.end();
    return { props: {} };
  }
};

export default AppDetail;
