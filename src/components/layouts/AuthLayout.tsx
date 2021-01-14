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

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - var(--header-height));
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
            <AuthLayoutHeader formType={formType} />
            {formType.includes("register") && !isMobile && (
                <AuthInfoSidebar type={formType} />
            )}
            <Container>
                {children}
            </Container>
            {formType === "login" && !isMobile && (
                <AuthInfoSidebar type={formType} />
            )}
            {isMobile && (
                <InfoFooter />
            )}
        </StyledAuthLayout>
    )
}