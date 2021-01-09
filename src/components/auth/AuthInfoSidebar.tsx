import styled from "styled-components";
import { FormType } from "ts"
import { getTextColor } from "helpers";
import { Policies, Socials } from "components/InfoFooter";

const StyledAuthInfoSidebar = styled.div`
    width: 30vw;
    height: 100vh;
    background-color: #6B1EF1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 3em;
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
            {type}
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