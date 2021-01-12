import styled from "styled-components";
import { FormType } from "ts"
import { getTextColor } from "helpers";
import { Policies, Socials } from "components/InfoFooter";
import { Button } from "components/Button";
import { useEffect, useState } from "react";
import { useRouter } from "next/router"

interface StyledAuthInfoSidebarProps {
    shows: boolean;
    isRight: boolean;
}

const StyledAuthInfoSidebar = styled.div<StyledAuthInfoSidebarProps>`
    width: var(--auth-sidebar-width);
    height: 100vh;
    background-color: #6B1EF1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 15em 0 3em;
    transform: translateX(${p => p.shows ? "0" : p.isRight ? "100%" : "-100%"});
    transition: transform .8s var(--easing);

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
    const router = useRouter();
    const [shows, setShows] = useState<boolean>(false);

    useEffect(() => {
        setShows(true);
    }, []);

    const handleFormToggle = () => {
        setShows(false);
        const timeout = setTimeout(() => router.push(`/${type === "register" ? "login" : "register"}`), 800)

        return () => clearTimeout(timeout)
    }

    return (
        <StyledAuthInfoSidebar shows={shows} isRight={type === "login"}>
            <div className="cta-change-formtype">
                <h2>Already have an account?</h2>
                <Button color="white" big bold onClick={() => handleFormToggle()}>{type === "register" ? "Go to Login" : "Go to Register"}</Button>
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