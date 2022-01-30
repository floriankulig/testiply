import styled from "styled-components";
import { FormType } from "ts";
import { capitalized, getTextColor, oppositeFormType } from "helpers";
import { Policies, Socials } from "components/InfoFooter";
import { Button } from "components/Button";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { InfoPageHeader } from "components/InfoPageHeader";

interface StyledAuthInfoSidebarProps {
  shows: boolean;
  isRight: boolean;
}

const StyledAuthInfoSidebar = styled.div<StyledAuthInfoSidebarProps>`
  width: var(--auth-sidebar-width);
  height: 100vh;
  background-color: #6b1ef1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2em;
  transform: translateX(
    ${(p) => (p.shows ? "0" : p.isRight ? "100%" : "-100%")}
  );
  transition: transform 0.5s var(--easing);
  overflow-y: auto;

  & .nav-links li {
    padding-top: 2em;
  }

  .cta-change-formtype {
    h2 {
      color: ${getTextColor("#6B1EF1")};
      margin: 3em 0 1em;
      &:last-of-type {
        margin-top: clamp(1em, 10vh, 3em);
      }
    }
    margin-bottom: 4em;
    text-align: center;
  }
`;

const Info = styled.div`
  width: 100%;
  text-align: center;
  color: ${getTextColor("#6B1EF1")};

  div {
    margin: 0 auto;
  }

  p {
    margin-top: 3em;
  }
`;

interface AuthInfoSidebarProps {
  type: FormType;
}

export const AuthInfoSidebar: React.FC<AuthInfoSidebarProps> = ({ type }) => {
  const router = useRouter();
  const [shows, setShows] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShows(true), 50);

    return () => clearTimeout(timeout);
  }, []);

  const handleFormToggle = (newRoute: "dev/register" | FormType) => {
    setShows(false);
    const timeout = setTimeout(() => router.push(`/${newRoute}`), 550);

    return () => clearTimeout(timeout);
  };

  return (
    <StyledAuthInfoSidebar shows={shows} isRight={type === "login"}>
      <InfoPageHeader
        style={{ flexDirection: "column" }}
        hasLogoBackground={true}
      />
      <div className="cta-change-formtype">
        <h2>
          {type.includes("register")
            ? "Already have an account?"
            : "Don't have an account yet?"}
        </h2>
        <Button
          color="white"
          big
          bold
          style={{ margin: "0 auto" }}
          onClick={() => handleFormToggle(oppositeFormType(type))}
          onKeyDown={() => handleFormToggle(oppositeFormType(type))}
        >
          {`Go to ${capitalized(oppositeFormType(type))}`}
        </Button>
        {type === "register" && (
          <>
            <h2>Want to publish your own app?</h2>
            <Button
              color="white"
              big
              bold
              basic
              style={{ margin: "0 auto" }}
              onClick={() => handleFormToggle("dev/register")}
              onKeyDown={() => handleFormToggle("dev/register")}
            >
              Register as a Publisher
            </Button>
          </>
        )}
      </div>
      <Info>
        <div className="info-group">
          <Socials />
          <Policies />
        </div>
        <p>© {new Date().getFullYear()} Testiply</p>
      </Info>
    </StyledAuthInfoSidebar>
  );
};
