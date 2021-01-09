import { AuthInfoSidebar } from "components/auth"
import styled from "styled-components"
import { FormType } from "ts"

const StyledAuthLayout = styled.div`
    max-height: 100vh;
    height: 100vh;
    display: flex;
`;


interface AuthLayoutProps {
    children: React.ReactNode;
    formType: FormType;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, formType }) => {
    return (
        <StyledAuthLayout style={{ maxHeight: "100vh", height: "100vh" }}>
            {formType === "register" && (
                <AuthInfoSidebar type={formType} />
            )}
            {children}
            {formType === "login" && (
                <AuthInfoSidebar type={formType} />
            )}
        </StyledAuthLayout>
    )
}