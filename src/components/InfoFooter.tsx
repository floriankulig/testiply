import styled from "styled-components";
import {
  FaInstagram,
  FaTwitter,
  FaFacebook,
  FaDiscord,
  FaGithub,
} from "react-icons/fa";
import Link from "next/link";
import { Button } from "./Button";

const StyledFooter = styled.footer`
  width: 100%;
  background-color: var(--navy);
  align-items: center;
  bottom: 0;
  height: 425px;
  margin-top: 15em;
  color: #ffffff;

  @media (${({ theme }) => theme.bp.small}) {
    height: 300px;
  }

  p {
    text-align: center;
    width: 100%;
    color: #b0b0b0;
    margin: 0;
    transform: translateY(200%);
  }
`;

const FooterContentGrid = styled.div`
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  h3 {
    font-weight: 300;
    margin-bottom: 1.5em;

    &:last-of-type {
      margin-bottom: 1em;
    }
  }

  @media (${({ theme }) => theme.bp.small}) {
    flex-direction: row;
  }
`;

const StyledSocials = styled.div`
  text-align: center;
  letter-spacing: 1.5px;
  margin: 0 auto;

  @media (${({ theme }) => theme.bp.small}) {
    margin: 0;
  }

  .social-icons {
    display: flex;
    justify-content: center;
    align-items: center;

    a {
      svg {
        margin-right: 0.75em;
        transform: scale(1.5);
      }
    }
  }
`;

const StyledPolicies = styled.div`
  text-align: center;
  letter-spacing: 1.5px;
  width: 200px;
  margin: 0 auto;
  margin-top: 2em;
  @media (${({ theme }) => theme.bp.small}) {
    margin: 0;
  }
  h3 a {
    color: currentColor;
    &:hover {
      cursor: pointer;
    }
  }
`;

export const Socials: React.FC = () => {
  return (
    <StyledSocials>
      <h3>View the Sourcecode</h3>
      <div className="social-icons">
        <a
          href="https://github.com/floriankulig/testiply"
          rel="noopener noreferrer"
        >
          <Button bold basic color="white">
            <FaGithub /> GitHub
          </Button>
        </a>
      </div>
    </StyledSocials>
  );
};

export const Policies: React.FC = () => {
  return (
    <StyledPolicies>
      <h3>
        <a
          href="https://api.testiply.n-mayr.net/imprint"
          className="link"
          rel="noopener noreferrer"
        >
          Imprint
        </a>
      </h3>
      <h3>
        <a
          className="link"
          href="https://api.testiply.n-mayr.net/privacy"
          rel="noopener noreferrer"
        >
          Privacy Policy
        </a>
      </h3>
    </StyledPolicies>
  );
};

export const InfoFooter: React.FC = () => {
  return (
    <StyledFooter>
      <div className="container">
        <FooterContentGrid>
          <Socials />
          <Policies />
        </FooterContentGrid>
        <p>© {new Date().getFullYear()} Testiply</p>
      </div>
    </StyledFooter>
  );
};
