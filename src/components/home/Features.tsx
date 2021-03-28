import { lighten, rgba } from "polished";
import { useEffect, useRef } from "react";
import ScrollOut from "scroll-out";
import {
  RiCodeSSlashFill,
  RiFeedbackLine,
  RiShoppingBag3Line,
} from "react-icons/ri";
import styled from "styled-components";

const FeaturesSection = styled.div`
  margin-top: 500px;
  position: relative;
  background: var(--layout-content-background);
  padding: 180px 0 200px;

  .triangle {
    position: absolute;
    width: 100%;
    height: 0;
    left: 0;
    border-style: solid;

    &-1 {
      top: 0;
      border-width: 80px 100vw 0 0;
      border-color: #ffffff transparent transparent transparent;
    }
    &-2 {
      bottom: 0;
      border-width: 0 0 80px 100vw;
      border-color: transparent transparent #ffffff transparent;
    }
  }
`;

const FeaturesContainer = styled.ul`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  @media (${({ theme }) => theme.bp.big}) {
    flex-direction: row;
  }
`;

const Feature = styled.li`
  width: 370px;
  padding: 4em 2.5em;
  max-width: 100%;
  min-height: 400px;
  margin: 0 auto;
  border-radius: 0.5em;
  text-align: center;
  margin-bottom: 4em;
  background: #ffffff;
  box-shadow: 7px 12px 30px ${({ theme }) => rgba(theme.primary, 0.1)};

  h2 {
    color: var(--navy);
    margin: 1.3em 0;
  }
  .svg-wrapper {
    width: 100px;
    height: 100px;
    position: relative;
    background: ${({ theme }) => rgba(theme.primary, 0.05)};
    color: var(--primary);
    margin-left: calc(50% - 60px);
    svg {
      position: absolute;
      top: 25%;
      left: 25%;
      width: 50px;
      height: 50px;
    }
  }

  &:nth-child(1) {
    .svg-wrapper {
      border-radius: 30% 70% 48% 52% / 35% 30% 70% 65%;
    }
  }
  &:nth-child(2) {
    .svg-wrapper {
      border-radius: 69% 31% 60% 40% / 39% 54% 46% 61%;
    }
  }
  &:nth-child(3) {
    .svg-wrapper {
      border-radius: 65% 35% 32% 68% / 47% 40% 60% 53%;
    }
  }

  p {
    color: ${({ theme }) => lighten(0.2, theme.navy)};
  }

  @media (${({ theme }) => theme.bp.big}) {
    margin: 0;
    width: clamp(230px, 22vw, 350px);
    &:nth-child(1) {
      transition-delay: 0.1s;
    }
    &:nth-child(2) {
      transition-delay: 0.2s;
    }
    &:nth-child(3) {
      transition-delay: 0.3s;
    }
  }
`;

export const Features: React.FC = () => {
  const features = useRef<HTMLLIElement[]>([]);

  useEffect(() => {
    ScrollOut({ targets: features.current, once: true, threshold: 0.5 });
  }, []);

  return (
    <FeaturesSection>
      <div className="triangle triangle-1" />
      <FeaturesContainer className="container">
        <Feature ref={(el) => (features.current[0] = el)}>
          <div className="svg-wrapper">
            <RiShoppingBag3Line />
          </div>
          <h2>Large App Offer</h2>
          <p>
            Our App-Market is always expanding and offering applications from
            all sorts of categories. Without having to download the source code,
            you can test any app you like.
          </p>
        </Feature>
        <Feature ref={(el) => (features.current[1] = el)}>
          <div className="svg-wrapper">
            <RiFeedbackLine />
          </div>
          <h2>Easy Feedback</h2>
          <p>
            We provide easy ways in our User Interface to give fast and easy
            feedback to featured developers, because we value your time.{" "}
          </p>
        </Feature>
        <Feature ref={(el) => (features.current[2] = el)}>
          <div className="svg-wrapper">
            <RiCodeSSlashFill />
          </div>
          <h2>Great For Developers</h2>
          <p>
            Having a platform to offer apps for Beta-Testing, developers can get
            valueable and fast feedback from users who know what could be
            important for your app.
          </p>
        </Feature>
      </FeaturesContainer>
      <div className="triangle triangle-2" />
    </FeaturesSection>
  );
};
