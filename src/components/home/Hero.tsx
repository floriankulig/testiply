import { useIsMobile } from "hooks"
import styled from "styled-components";

const HeroSection = styled.section`
    margin-top: 10em;
    margin-bottom: 30em;
    @media (min-width: 1081px) {
    margin-top: 5em;
    margin-bottom: 20vw;
    }
    align-items: center;
    display: flex;
    justify-content: space-between;

    .hero__svg {
        margin-right: 10%;
        @media (min-width: 1201px) {
            margin: 0;
        }
        height: clamp(200px, 40vw, 600px);
    }
`;


const BackgroundImage = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: -9000;

    &.mobile {
        width: 100%;
        height: auto;
        min-height: 800px;
        object-fit: cover;
    }
`

const Content = styled.div`
    user-select: none;
    margin: 1%;
    @media (min-width: 721px) {
        margin-left: 10%;
    }

    @media (min-width: 1201px) {
        margin: 0;
    }

    h1 {
        color: white;
        font-size: clamp(3.5rem, 6vw, 5rem);
        margin: 0 0 0.25em 0;
        &:last-of-type {
            color: #ff0000;
        }
    }

    button {
        background-color: white;
        border: none;
        padding: 0.8em 2em;
        font-weight: bold;
        font-size: clamp(1rem, 2vw, 1.2rem);
        border-radius: 2em;
        margin-top: 2em;
        cursor: pointer;
        box-shadow: 4px 5px 15px rgba(110, 127, 218, 0.25);
    }
`

export const Hero: React.FC = () => {
    const isMobile = useIsMobile(1080);

    return (
        <HeroSection className="container">
            <BackgroundImage className={`${isMobile ? "mobile" : ""}`} src={`/images/hero_bg${isMobile ? "-mobile" : ""}.svg`} alt="" />
            <Content>
                <h1>Test Apps.</h1>
                <h1>Give Feedback.</h1>
                <button>View Apps</button>
            </Content>
            {!isMobile && <img className="hero__svg" src="/images/app_phone.svg" alt="" />}
        </HeroSection>
    )
}
