import styled from "styled-components";
import { FormType } from "ts"
import { getTextColor } from "helpers";
import { Policies, Socials } from "components/InfoFooter";
import { Button } from "components/Button";
import Link from "next/link";

const StyledAuthInfoSidebar = styled.div`
    width: var(--auth-sidebar-width);
    height: 100vh;
    background-color: #6B1EF1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 15em 0 3em;

    .cta-change-formtype{
        h2{
            color: ${getTextColor("#6B1EF1")};
            margin-bottom: 1.5em;
        }
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

    p{
        margin-top: 3em;
    }
`;

interface AuthInfoSidebarProps {
    type: FormType
}

export const AuthInfoSidebar: React.FC<AuthInfoSidebarProps> = ({ type }) => {
    return (
        <StyledAuthInfoSidebar>
            <div className="cta-change-formtype">
                {type === "register" ? (
                    <>
                        <h2>Already have an account?</h2>
                        <Link href="/login">
                            <Button color="white" big bold >Go to Log In</Button>
                        </Link>
                    </>
                ) : (
                        <>
                            <h2>Don't have an account yet?</h2>
                            <Link href="/register">
                                <Button color="white" big bold>Go to Register</Button>
                            </Link>
                        </>
                    )
                }
            </div>
            <Info>
                <div className="info-group">
                    <Socials />
                    <Policies />
                </div>
                <p>© {new Date().getFullYear()} Beta App Store</p>
            </Info>
        </StyledAuthInfoSidebar>
    )
}