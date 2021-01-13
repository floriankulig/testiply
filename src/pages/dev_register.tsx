import { DevRegisterForm } from "components/auth";
import { AuthLayout } from "components/layouts";
import { useIsMobile } from "hooks";
import { NextPage } from "next";
import { useState } from "react";

const DevRegister: NextPage = () => {


    return (
        <AuthLayout formType="dev_register">
            <DevRegisterForm />
        </AuthLayout>
    )
}

export default DevRegister