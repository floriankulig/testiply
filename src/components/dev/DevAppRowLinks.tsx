import { AnimatePresence, motion, Variants } from "framer-motion";
import { darken, rgba } from "polished";
import styled, { css } from "styled-components";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaChevronDown, FaStar } from "react-icons/fa";
import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import * as Yup from "yup";
import { useOnClickOutside } from "hooks";
import { GoCheck, GoLinkExternal, GoTrashcan } from "react-icons/go";
import { DeleteAppModal } from "components/DeleteAppModal";
import { App } from "ts";
import { Button } from "components/Button";
import { FiDownload } from "react-icons/fi";
import { BiCommentDetail } from "react-icons/bi";
import { AiOutlineNumber, AiOutlineEdit, AiOutlineApple } from "react-icons/ai";
import { IoIosGlobe, IoMdLink } from "react-icons/io";
import { theme } from "styles";
import { IconType } from "react-icons/lib";
import { Form, Formik, FormikValues } from "formik";

// we hardcode the values here because there is no suitable grid/flexbox solution
const bp1 = "620px";
const bp2 = "960px";
const bp3 = "1310px";

const StyledLinks = styled.div`
  margin-top: 1.5em;

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
  exit: { y: -15, opacity: 0 },
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
  categories: Yup.array()
    .of(Yup.object().shape({ id: Yup.string(), displayName: Yup.string() }))
    .min(1, "Must select at least 1 category")
    .max(4, "Can't select more than 4 categories"),
});

interface LinksProps {
  app: App;
}

export const Links: React.FC<LinksProps> = ({ app }) => {
  const [editModeOn, setEditModeOn] = useState<boolean>(false);

  const initialValues: FormValues = {
    testflightIos: app.testflightIos,
    testflightIpados: app.testflightIpados,
    website: app.website,
  };

  const toggleEdit = async (values: FormikValues) => {
    if (!editModeOn) {
      setEditModeOn(true);
      return;
    }
    if (JSON.stringify(values) !== JSON.stringify(initialValues)) {
      await handleAppUpdate(values);
    }
    setEditModeOn(false);
  };

  const handleAppUpdate = async ({
    testflightIos,
    testflightIpados,
    website,
  }: FormikValues) => {
    console.log("update triggered");
  };

  return (
    <StyledLinks as={motion.div} layout variants={linksContainerOuter}>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => await toggleEdit(values)}
        validationSchema={linkValidationSchema}
      >
        <Form autoComplete="off">
          <StyledLinksTopRow as={motion.div} layout variants={linkVariants}>
            <h3 className="links-header">Links</h3>
            <Button
              rounded
              as={motion.button}
              disableElevation
              // disabled
              aria-label={`Toggle edit mode for app: ${app.name}`}
              // title="Feature is currently being developed"
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
                {app.testflightIos && (
                  <LinkEditOn name="testflightIos" label="iOS" />
                )}
                {app.testflightIpados && (
                  <LinkEditOn name="testflightIpados" label="iPadOS" />
                )}
                {app.website && <LinkEditOn name="website" label="Web" />}
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
                {app.testflightIos && (
                  <LinkEditOff link={app.testflightIos} label="iOS" />
                )}
                {app.testflightIpados && (
                  <LinkEditOff link={app.testflightIpados} label="iPadOS" />
                )}
                {app.website && <LinkEditOff link={app.website} label="Web" />}
              </StyledLinksContainerEditOff>
            )}
          </AnimatePresence>
        </Form>
      </Formik>
    </StyledLinks>
  );
};

const StyledLink = styled.div`
  background: var(--layout-nav-background);
  position: relative;
  border-radius: 6px;
  padding: 1em;
  padding-right: 2em;
  @media (min-width: ${bp2}) {
    padding-right: 1.5em;
  }
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

const StyledLinkInput = styled.div`
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

interface LinkEditOnProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
}

const LinkEditOn: React.FC<LinkEditOnProps> = ({ label, ...restProps }) => {
  const Icon: IconType =
    label.startsWith("i") && label.endsWith("OS")
      ? AiOutlineApple
      : label === "Web"
      ? IoIosGlobe
      : null;

  return (
    <StyledLink as={motion.div} variants={linkVariants} layout>
      <StyledLinkLabel>{label}</StyledLinkLabel>
      <StyledLinkInput>
        <IoMdLink />
        <input {...restProps} />
      </StyledLinkInput>
      {!!Icon && <Icon />}
    </StyledLink>
  );
};
