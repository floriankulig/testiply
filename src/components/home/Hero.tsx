import { Button } from "components/Button";
import Link from "next/link";
import { useIsMobile } from "hooks";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";
import { rgba } from "polished";

const HeroSection = styled.section`
  margin-top: 10em;
  margin-bottom: 30em;
  @media (${({ theme }) => theme.bp.medium}) {
    margin-top: 5em;
    margin-bottom: 20vw;
  }
  align-items: center;
  display: flex;
  justify-content: space-between;
  .hero__svg {
    display: none;
    margin: 0;
    height: clamp(200px, 40vw, 600px);
    @media (${({ theme }) => theme.bp.medium}) {
      display: block;
    }
  }
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  max-height: 900px;
  min-height: 850px;
  background: linear-gradient(to bottom right, #4930a3, #8c21ed);
  z-index: -999;

  @media (${({ theme }) => theme.bp.big}) {
    height: 115vh;
    min-height: 960px;
    max-height: 1200px;
  }
`;

const DividerWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .circle {
    position: absolute;
    background: linear-gradient(
      to bottom right,
      ${rgba("#ffffff", 0.1)},
      ${rgba("#ffffff", 0.05)}
    );

    &-1 {
      top: 15%;
      left: 2%;
      border-radius: 31% 69% 31% 69% / 20% 27% 73% 80%;
      width: 300px;
      height: 370px;
      background: linear-gradient(
        to bottom right,
        ${rgba("#ffffff", 0.2)},
        ${rgba("#ffffff", 0.01)}
      );
    }
    &-2 {
      top: 15%;
      right: 4%;
      border-radius: 75% 25% 80% 20% / 46% 36% 64% 54%;
      width: 300px;
      height: 300px;
    }
    &-3 {
      top: 0.5%;
      right: 8%;
      border-radius: 19% 81% 27% 73% / 70% 70% 30% 30%;
      width: 400px;
      height: 325px;
      visibility: hidden;
      @media (${({ theme }) => theme.bp.small}) {
        visibility: visible;
      }
    }
  }

  .custom-shape-divider-bottom-1612106404 {
    position: absolute;
    bottom: 0;
    left: 0;
    overflow: hidden;
    line-height: 0;
    transform: rotate(180deg);
    width: 350%;
    @media (${({ theme }) => theme.bp.small}) {
      width: 200%;
    }
    @media (${({ theme }) => theme.bp.medium}) {
      width: 150%;
    }
    @media (${({ theme }) => theme.bp.big}) {
      width: 100%;
    }
  }

  .custom-shape-divider-bottom-1612106404 svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 200px;
  }

  .custom-shape-divider-bottom-1612106404 .shape-fill {
    fill: #ffffff;
  }
`;

const Content = styled.div`
  user-select: none;

  @media (${({ theme }) => theme.bp.medium}) {
    margin: 0;
  }

  h1 {
    color: white;
    font-size: clamp(3.3rem, 6.3vw, 5rem);
    margin: 0 0 0.25em 0;
    opacity: 0;
    animation: fadeUp 0.5s var(--easing) forwards 0.2s;
    &:last-of-type {
      color: #ff0000;
      margin-bottom: 0.5em;
      animation-delay: 0.25s;
    }
  }

  button {
    box-shadow: 4px 5px 15px rgba(110, 127, 218, 0.25);
    font-size: clamp(1rem, 2vw, 1.2rem);
    opacity: 0;
    animation: fadeUp 0.5s var(--easing) forwards 0.3s;
  }
`;

export const Hero: React.FC = () => {
  const isMobile = useIsMobile(1080);

  return (
    <HeroSection className="container">
      <Background>
        <DividerWrapper>
          <CSSTransition
            in={!isMobile}
            timeout={250}
            classNames="pop-in"
            unmountOnExit
          >
            <div className="circle circle-1" />
          </CSSTransition>
          <div className="circle circle-2" />
          <div className="circle circle-3" />
          <div className="custom-shape-divider-bottom-1612106404">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                opacity=".25"
                className="shape-fill"
              ></path>
              <path
                d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                opacity=".5"
                className="shape-fill"
              ></path>
              <path
                d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                className="shape-fill"
              ></path>
            </svg>
          </div>
        </DividerWrapper>
      </Background>
      <Content>
        <h1>Test Apps.</h1>
        <h1>Give Feedback.</h1>
        <Link href="/store">
          <Button rounded bold color="white">
            View Apps
          </Button>
        </Link>
      </Content>
      <CSSTransition
        in={!isMobile}
        timeout={250}
        classNames="pop-in"
        unmountOnExit
      >
        <img
          className="hero__svg"
          src="/images/app_phone.svg"
          alt="People holding app icons"
        />
      </CSSTransition>
    </HeroSection>
  );
};
