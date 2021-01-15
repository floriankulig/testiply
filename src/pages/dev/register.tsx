import { MultilevelForm } from "components/forms";
import { AuthLayout } from "components/layouts";
import { NextPage } from "next";
import { useState } from "react";

const DevRegister: NextPage = () => {
    const formNames = ["first", "second", "third", "fourth"]
    const [activeForm, setActiveForm] = useState<string>(formNames[0]);

    return (
        <AuthLayout formType="dev_register">
            <MultilevelForm setActiveForm={setActiveForm} formNames={formNames} />
        </AuthLayout>
    )
}

export default DevRegister