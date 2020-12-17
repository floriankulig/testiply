import styled from "styled-components"
import { FaInstagram, FaTwitter, FaFacebook, FaDiscord } from "react-icons/fa"


const StyledFooter = styled.footer`
    width: 100%;
    background-color: ${({ theme }) => theme.navy};
    align-items: center;
    bottom: 0;
    height: 425px;
    margin-top: 15em;
    color: #ffffff;

    @media (${({ theme }) => theme.bp.small}){
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
        font-weight:300;
        margin-bottom: 1.5em;

        &:last-of-type {
            margin-bottom: 1em;
        }
    }

    @media (${({ theme }) => theme.bp.small}){
        flex-direction: row;
    }
`

const Socials = styled.div`
    text-align: center;
    letter-spacing: 1.5px;
    width: 200px;
    margin: 0 auto;

    @media (${({ theme }) => theme.bp.small}){
        margin: 0;
    }


    .social-icons { 
        display: flex;
        justify-content: space-between;
        align-items: center;

        a {
            color: #ffffff;
            transition: color .2s ease;
            &:hover{
                color: #bebebe;
            }
            svg{
                width: 25px;
                height: 25px;
            }
        }
    }
`

const Policies = styled.div`
    text-align: center;
    letter-spacing: 1.5px;
    width: 200px;
    margin: 0 auto;
    margin-top: 2em;
    @media (${({ theme }) => theme.bp.small}){
        margin: 0 ;
    }
`

export const InfoFooter: React.FC = () => {
    return (
        <StyledFooter>
            <div className="container">
                <FooterContentGrid>
                    <Socials>
                        <h3>
                            Socials
                        </h3>
                        <div className="social-icons">
                            <a href="https://www.instagram.com/betappstore/" target="_blank" rel="noopener noreferrer">
                                <FaInstagram />
                            </a>
                            <a href="https://www.facebook.com/betaappstoree" target="_blank" rel="noopener noreferrer">
                                <FaFacebook />
                            </a>
                            <a href="https://twitter.com/betaAppStoree" target="_blank" rel="noopener noreferrer">
                                <FaTwitter />
                            </a>
                            <a href="https://discord.com/invite/6Buy9FdC" target="_blank" rel="noopener noreferrer">
                                <FaDiscord />
                            </a>
                        </div>
                    </Socials>
                    <Policies>
                        <h3>
                            Imprint
                        </h3>
                        <h3>
                            Privacy Policy
                        </h3>
                    </Policies>
                </FooterContentGrid>
                <p>© {new Date().getFullYear()} Beta App Store</p>
            </div>
        </StyledFooter>
    )
}
