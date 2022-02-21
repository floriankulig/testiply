import { AnimatePresence, motion, Variants } from "framer-motion";
import { rgba } from "polished";
import styled, { css } from "styled-components";
import React, { useState } from "react";
import * as Yup from "yup";
import { GoCheck } from "react-icons/go";
import { App } from "ts";
import { Button } from "components/Button";
import { AiOutlineEdit, AiOutlineApple } from "react-icons/ai";
import { IoIosGlobe, IoMdLink } from "react-icons/io";
import { theme } from "styles";
import { IconType } from "react-icons/lib";
import { Form, Formik, FormikProps, FormikValues, useField } from "formik";
import { ErrorMessage } from "components/ErrorMessage";
import { MdError } from "react-icons/md";
import axios from "axios";
import { PlatformID } from "ts/types";
import { generateNewPlatforms } from "helpers";

// we hardcode the values here because there is no suitable grid/flexbox solution
const bp1 = "620px";
const bp2 = "960px";
const bp3 = "1310px";

const StyledLinks = styled.div`
  margin-top: 1.5em;
  height: 100%;

  @media (min-width: ${bp1}) {
    width: 80%;
    margin: 1.5em auto 0;
  }
  @media (min-width: ${bp2}) {
    margin: 0;
    margin-left: clamp(2em, 4vw, 5em);
  }

  h3.links-header {
    font-size: clamp(1.4rem, 3vw, 1.5rem);
    font-weight: 500;
    color: var(--navy);
    margin: 0;
  }

  ${ErrorMessage} {
    margin: 0 auto;
    width: 100%;
    max-width: 400px;

    @media (min-width: ${bp2}) {
      margin: 0;
    }
  }
`;

const StyledLinksTopRow = styled.div`
  margin: 0.25em 0 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${Button} {
    font-size: 0.9rem;
    span.edit-btn-svg {
      font-size: 1.1rem;
      margin: 0 0.5em 0 -0.2em;
    }
  }
`;
const StyledLinksContainerEditOff = styled.div`
  @media (min-width: ${bp1}) {
    width: fit-content;
  }
  max-width: 100%;
`;

const linkVariants: Variants = {
  initial: { y: -15, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: { y: -10, opacity: 0 },
};

const linksContainerOuter: Variants = {
  animate: { transition: { delayChildren: 0.3 } },
};
const linksContainer: Variants = {
  animate: { transition: { delayChildren: 0.4, staggerChildren: 0.1 } },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

interface FormValues {
  testflightIos: string;
  testflightIpados: string;
  website: string;
}

const linkValidationSchema = Yup.object({
  testflightIos: Yup.string().url("Must be a valid Testflight URL"),
  testflightIpados: Yup.string().url("Must be a valid Testflight URL"),
  website: Yup.string().url("Must be a valid Website URL"),
});

interface LinksProps {
  app: App;
  apps: App[];
  setApps: React.Dispatch<React.SetStateAction<App[]>>;
}

export const Links: React.FC<LinksProps> = ({ app, apps, setApps }) => {
  const [editModeOn, setEditModeOn] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const initialValues: FormValues = {
    testflightIos: app.testflightIos,
    testflightIpados: app.testflightIpados,
    website: app.website,
  };

  const [lastSavedValues, setLastSavedValues] =
    useState<FormikValues>(initialValues);

  const toggleEdit = async (values: FormikValues) => {
    if (!editModeOn) {
      setEditModeOn(true);
      return;
    }
    // all links were removed
    if (Object.values(values).every((key) => key.length <= 0)) {
      setErrorMessage("Must provide at least one link");
      return;
    }
    setErrorMessage("");
    // actually changed data
    if (JSON.stringify(values) !== JSON.stringify(lastSavedValues)) {
      const {
        testflightIos,
        testflightIpados,
        website,
        platforms,
        ...restApp
      } = app;

      const updatedApp: App = {
        ...values,
        platforms: generateNewPlatforms(values as FormValues),
        ...restApp,
      };
      try {
        await handleAppUpdate(updatedApp);
      } catch (err) {
        return;
      }
      setLastSavedValues(values);
      updateAppArray(updatedApp);
    }
    setEditModeOn(false);
  };

  const handleAppUpdate = async (updatedApp: App) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/updateApp?appId=${app._id}`,
        { updatedApp }
      );
    } catch (err) {
      setErrorMessage(err.response.data.err);
    }
  };

  const updateAppArray = (updatedApp: App): void => {
    const idx = apps.indexOf(app);

    const newApps = apps;
    newApps[idx] = updatedApp;
    setApps(newApps);
  };

  return (
    <StyledLinks as={motion.div} layout variants={linksContainerOuter}>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => await toggleEdit(values)}
        validationSchema={linkValidationSchema}
      >
        {({ values }: FormikProps<any>) => (
          <Form autoComplete="off">
            <StyledLinksTopRow as={motion.div} layout variants={linkVariants}>
              <h3 className="links-header">Links</h3>
              <Button
                rounded
                as={motion.button}
                disableElevation
                midBold
                aria-label={`Toggle edit mode for app: ${app.name}`}
                whileTap={{ scale: 0.85 }}
                animate={{
                  backgroundColor: editModeOn ? "#15a126" : theme.primary,
                  transition: { duration: 0.3 },
                }}
                type="submit"
              >
                <AnimatePresence exitBeforeEnter initial={false}>
                  {!!editModeOn && (
                    <motion.div
                      className="flex-center"
                      key="editOn"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 20, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <span className="edit-btn-svg">
                        <GoCheck />
                      </span>{" "}
                      <span>SAVE</span>
                    </motion.div>
                  )}
                  {!editModeOn && (
                    <motion.div
                      className="flex-center"
                      key="editOff"
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <span className="edit-btn-svg">
                        <AiOutlineEdit />
                      </span>{" "}
                      <span>EDIT</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </StyledLinksTopRow>
            <AnimatePresence exitBeforeEnter>
              {editModeOn ? (
                <motion.div
                  key={`links-editOn-${app._id}`}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={linksContainer}
                  layout
                >
                  <LinkEditOn
                    name="testflightIos"
                    label="iOS"
                    placeholder="Provide your TestFlight link for iOS"
                  />
                  <LinkEditOn
                    name="testflightIpados"
                    placeholder="Provide your TestFlight link for iPadOS"
                    label="iPadOS"
                  />
                  <LinkEditOn
                    name="website"
                    placeholder="Provide link for your WebApp"
                    label="Web"
                  />
                  {!!errorMessage && (
                    <ErrorMessage>
                      <MdError /> {errorMessage}
                    </ErrorMessage>
                  )}
                </motion.div>
              ) : (
                <StyledLinksContainerEditOff
                  as={motion.div}
                  key={`links-editOff-${app._id}`}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={linksContainer}
                  layout
                >
                  {values.testflightIos && (
                    <LinkEditOff link={values.testflightIos} label="iOS" />
                  )}
                  {values.testflightIpados && (
                    <LinkEditOff
                      link={values.testflightIpados}
                      label="iPadOS"
                    />
                  )}
                  {values.website && (
                    <LinkEditOff link={values.website} label="Web" />
                  )}
                </StyledLinksContainerEditOff>
              )}
            </AnimatePresence>
          </Form>
        )}
      </Formik>
    </StyledLinks>
  );
};

const StyledLink = styled.div<{ editOn?: boolean }>`
  background: var(--layout-nav-background);
  position: relative;
  border-radius: 6px;
  padding: 1em;
  ${(p) =>
    !p.editOn
      ? css`
          padding-right: 2em;
          @media (min-width: ${bp2}) {
            padding-right: 1.5em;
          }
        `
      : css`
          @media (min-width: ${bp2}) {
            max-width: 400px;
            padding: 0.8em 1em;
            padding-right: 0.8em;
          }
        `}
  border: 1px solid ${(p) => rgba(p.theme.primary, 0.05)};
  box-shadow: ${rgba(0, 0, 0, 0.01)} 0px 0px 15px;
  display: flex;
  margin-bottom: 1em;
  flex-direction: column;
  color: var(--navy);
  overflow: hidden;

  & > svg {
    position: absolute;
    top: 0.1em;
    right: 0.2em;
    color: #eeeeee;
    width: 30px;
    height: 30px;
    z-index: -1;
  }
`;

const StyledLinkLabel = styled.label`
  font-size: 0.8rem;
  margin-bottom: 0.6em;
  font-weight: 500;
  user-select: none;
  color: #afb5c4;
`;

const StyledLinkBody = styled.a`
  display: flex;
  width: auto;
  align-items: center;
  svg {
    margin: 1px 0.5em 0 0;
    min-width: 18px;
    min-height: 18px;
  }
  span {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

const StyledLinkInputWrapper = styled.div<{ showsError: boolean }>`
  display: flex;
  width: 100%;
  align-items: center;
  svg {
    margin: 1px 0.5em 0 0;
    min-width: 18px;
    min-height: 18px;
  }
  input {
    width: 100%;
    background-color: var(--layout-content-background);
    border-radius: 4px;
    padding: calc(0.5em - 2px); // border calculated in
    font-size: 0.9rem;
    color: var(--navy);

    border: 1px solid
      ${(p) => (p.showsError ? " red" : "var(--layout-content-background)")};
    transition: border 0.5s;

    &::placeholder {
      color: ${({ theme }) => rgba(theme.navy, 0.7)};
    }
  }
`;

interface LinkEditOffProps {
  link: string;
  label: string;
}

const LinkEditOff: React.FC<LinkEditOffProps> = ({ link, label }) => {
  const Icon: IconType =
    label.startsWith("i") && label.endsWith("OS")
      ? AiOutlineApple
      : label === "Web"
      ? IoIosGlobe
      : null;

  return (
    <StyledLink as={motion.div} variants={linkVariants} layout>
      <StyledLinkLabel>{label}</StyledLinkLabel>
      <StyledLinkBody
        as={motion.a}
        whileHover={{ color: theme.primary }}
        target="_blank"
        rel="noopener noreferrer"
        href={link}
      >
        <IoMdLink />
        <span className="link">{link}</span>
      </StyledLinkBody>
      {!!Icon && <Icon />}
    </StyledLink>
  );
};

const LinkEditOn = ({ label, ...restProps }: any) => {
  const [field, meta] = useField(restProps);
  const showsError: boolean = meta.touched && meta.error ? true : false;

  const Icon: IconType =
    label.startsWith("i") && label.endsWith("OS")
      ? AiOutlineApple
      : label === "Web"
      ? IoIosGlobe
      : null;

  return (
    <StyledLink as={motion.div} variants={linkVariants} editOn layout>
      <StyledLinkLabel>{label}</StyledLinkLabel>
      <StyledLinkInputWrapper showsError={showsError}>
        <IoMdLink />
        <input {...field} {...restProps} />
      </StyledLinkInputWrapper>
      {!!Icon && <Icon />}
    </StyledLink>
  );
};
