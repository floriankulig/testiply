import { Button } from "components/Button";
import { useEffect, useState } from "react"
import styled from "styled-components";
import { theme } from "styles";
import { AuthForm } from "components/forms";

const ToggleFormButtons = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin-top: 1em;
    @media (min-width: 400px) {
        flex-direction: row;
    }
`;

interface MultilevelFormProps {
    className?: string;
    style?: Object;
    children: React.ReactNode;
    formNames: string[];
    setActiveForm: React.Dispatch<React.SetStateAction<string>>;
    minLevel?: number;
    handleSubmit: Function
}

export const MultilevelForm: React.FC<MultilevelFormProps> = ({ className, style, children, formNames, setActiveForm, minLevel, handleSubmit }) => {
    //the furthest the user can go back in the form; indexed at zero
    const minStep: number = minLevel || 0
    const [step, setStep] = useState<number>(minStep);

    const isAtLimit = (type: "MAX" | "MIN"): boolean => {
        if (type === "MAX") {
            return step >= formNames.length - 1
        } else {
            return step <= minStep
        }
    }

    const handleFormChange = (type: "INCREMENT" | "DECREMENT") => {
        switch (type) {
            case "INCREMENT":
                if (!isAtLimit("MAX")) {
                    setStep(step => step + 1);
                }
                break;
            case "DECREMENT":
                if (!isAtLimit("MIN")) {
                    setStep(step => step - 1);
                }
                break;
        }
    }

    useEffect(() => {
        setActiveForm(formNames[step]);
        console.log(step)
    }, [step]);

    return (
        <AuthForm onSubmit={(e) => handleSubmit(e)} className={className} style={style}>
            {children}
            <ToggleFormButtons>
                <Button
                    bold
                    color={theme.layoutContentBg}
                    disableElevation
                    disabled={isAtLimit("MIN")}
                    onClick={() => handleFormChange("DECREMENT")}
                    onKeyDown={() => handleFormChange("DECREMENT")}
                    type="button"
                >
                    Go Back
                </Button>
                {!isAtLimit("MAX") && (
                    <Button
                        bold
                        onClick={() => handleFormChange("INCREMENT")}
                        onKeyDown={() => handleFormChange("INCREMENT")}
                        type="button"
                    >
                        Next Step
                    </Button>
                )}
                {isAtLimit("MAX") && (
                    <Button bold>
                        Register
                    </Button>
                )}
            </ToggleFormButtons>
        </AuthForm>
    )
}
