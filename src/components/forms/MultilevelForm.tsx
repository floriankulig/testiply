import { useEffect, useState } from "react"

interface MultilevelFormProps {
    className?: string;
    style?: Object;
    formNames: string[];
    setActiveForm: React.Dispatch<React.SetStateAction<string>>;
    minLevel?: number;
}

export const MultilevelForm: React.FC<MultilevelFormProps> = ({ className, style, formNames, setActiveForm, minLevel }) => {
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
        console.log(minStep)
    }, [step]);

    return (
        <div className={className} style={style}>
            Step: {step}; {formNames[step]}
            <button onClick={() => handleFormChange("INCREMENT")}>in</button>
            <button onClick={() => handleFormChange("DECREMENT")}>de</button>
        </div>
    )
}
