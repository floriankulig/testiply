import { AuthInfoSidebar } from "components/auth"
import { InfoFooter } from "components/InfoFooter";
import { InfoPageHeader } from "components/InfoPageHeader";
import { getTextColor } from "helpers";
import { useIsMobile } from "hooks";
import styled from "styled-components"
import { theme } from "styles";
import { FormType } from "ts"

const StyledAuthLayout = styled.div`
    background-color: var(--layout-content-background);
    display: flex;
    flex-direction: column;

    @media (${({ theme }) => theme.bp.big}){
        flex-direction: row;
        max-height: 100vh;
    }
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: auto;
`;


const FormContainer = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    place-items:center;
    flex-direction: column;
    min-height: calc(100vh - var(--header-height));
    overflow-x: hidden;
    @media (${({ theme }) => theme.bp.big}) {
        height: 100vh;
        max-height: 100vh;
        width: calc(100vw - var(--auth-sidebar-width));
    }
`;



interface AuthLayoutProps {
    children: React.ReactNode;
    formType: FormType;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, formType }) => {
    const isMobile = useIsMobile(1200);

    return (
        <StyledAuthLayout style={{ minHeight: "100vh" }}>
            {formType.includes("register") && !isMobile && (
                <AuthInfoSidebar type={formType} />
            )}
            <ContentContainer>
                {isMobile && <InfoPageHeader style={{
                    color: getTextColor(theme.layoutContentBg),
                    padding: `0 ${isMobile ? "5%" : "4em"}`
                }} />}
                <FormContainer>
                    {children}
                </FormContainer>
            </ContentContainer>
            {formType === "login" && !isMobile && (
                <AuthInfoSidebar type={formType} />
            )}
            {isMobile && (
                <InfoFooter />
            )}
        </StyledAuthLayout>
    )
}