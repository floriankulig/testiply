import styled from "styled-components";
import { FaInstagram, FaTwitter, FaFacebook, FaDiscord } from "react-icons/fa";
import Link from "next/link";

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
  width: 200px;
  margin: 0 auto;

  @media (${({ theme }) => theme.bp.small}) {
    margin: 0;
  }

  .social-icons {
    display: flex;
    justify-content: space-between;
    align-items: center;

    a {
      color: #ffffff;
      transition: color 0.2s ease;
      &:hover {
        color: #bebebe;
      }
      svg {
        width: 25px;
        height: 25px;
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
  h3 a:hover {
    cursor: pointer;
  }
`;

export const Socials: React.FC = () => {
  return (
    <StyledSocials>
      <h3>Socials</h3>
      <div className="social-icons">
        <a
          href="https://www.instagram.com/betappstore/"
          className="link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram />
        </a>
        <a
          href="https://www.facebook.com/betaappstoree"
          className="link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook />
        </a>
        <a
          href="https://twitter.com/betaAppStoree"
          className="link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter />
        </a>
        <a
          href="https://discord.gg/EebKeM32RH"
          className="link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaDiscord />
        </a>
      </div>
    </StyledSocials>
  );
};

export const Policies: React.FC = () => {
  return (
    <StyledPolicies>
      <Link href="/imprint">
        <h3>
          <a className="link">Imprint</a>
        </h3>
      </Link>
      <h3>
        <a className="link">Privacy Policy</a>
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
