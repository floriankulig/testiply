import { AuthInfoSidebar } from "components/auth"
import { AuthLayoutHeader } from "components/auth/AuthLayoutHeader";
import { InfoFooter } from "components/InfoFooter";
import { useIsMobile } from "hooks";
import styled from "styled-components"
import { FormType } from "ts"

const StyledAuthLayout = styled.div`
    background-color: var(--layout-content-background);
    display: flex;
    flex-direction: column;

    @media (${({ theme }) => theme.bp.big}){
        flex-direction: row;
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
            <AuthLayoutHeader formType={formType} />
            {formType.includes("register") && !isMobile && (
                <AuthInfoSidebar type={formType} />
            )}
            {children}
            {formType === "login" && !isMobile && (
                <AuthInfoSidebar type={formType} />
            )}
            {isMobile && (
                <InfoFooter />
            )}
        </StyledAuthLayout>
    )
}