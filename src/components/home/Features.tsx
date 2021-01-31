import { lighten } from "polished";
import { RiCodeSSlashFill, RiFeedbackLine, RiShoppingBag3Line } from "react-icons/ri";
import styled from "styled-components"

const FeaturesSection = styled.div`
    margin-top: 400px;
    position: relative;
    background: var(--layout-content-background);
    padding: 180px 0 200px;

    .triangle{
        position: absolute;
        width: 100%;
        height: 0;
        left: 0;
        border-style: solid;

        &-1{
            top: 0;
            border-width: 80px 100vw 0 0;
            border-color: #ffffff transparent transparent transparent;
        }
        &-2{
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
`

const Feature = styled.li`
    width: 370px;
    max-width: 100%;
    margin: 0 auto;
    margin-bottom: 4em;
    color: var(--navy);

    svg{
        width: 20%;
        height: 20%;
        color: var(--primary);
        margin-left: -4%;
    }

    p {
        color: ${({ theme }) => lighten(0.2, theme.navy)};
    }

    @media (${({ theme }) => theme.bp.big}) {
        margin: 0;
        width: clamp(230px, 22vw, 330px);
    }
`

export const Features: React.FC = () => {
    return (
        <FeaturesSection>
            <div className="triangle triangle-1" />
            <FeaturesContainer className="container">
                <Feature>
                    <RiShoppingBag3Line />
                    <h2>Large App Offer</h2>
                    <p>Our App-Market is always expanding and offering applications from all sorts of categories. Without having to download the source code, you can test any app you like.</p>
                </Feature>
                <Feature>
                    <RiFeedbackLine />
                    <h2>Easy Feedback</h2>
                    <p>We provide easy ways in our User Interface to give fast and easy feedback to featured developers, because we value your time. </p>
                </Feature>
                <Feature>
                    <RiCodeSSlashFill />
                    <h2>Great For Developers</h2>
                    <p>Having a platform to offer apps for Beta-Testing, developers can get valueable and fast feedback from users who know what could be important for your app.</p>
                </Feature>
            </FeaturesContainer>
            <div className="triangle triangle-2" />
        </FeaturesSection>
    )
}
