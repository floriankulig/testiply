import { Button } from "components/Button";
import { AuthForm, TextInput } from "components/forms";
import { SelectionInput } from "components/SelectionInput";
import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { FormType, Gender, genders } from "ts"
import { DateInput } from "./DateInput";
import { useIsMobile } from "hooks";
import Link from "next/link";
import { theme } from "styles";

interface TesterAuthFormProps {
    formType: FormType;
}

export const TesterAuthForm: React.FC<TesterAuthFormProps> = ({ formType }) => {
    const [showPasswords, setShowPasswords] = useState<boolean>(false);
    const [gender, setGender] = useState<Gender | null>(null);

    const minBirthDate = new Date("1900-01-01")
    let maxBirthDate = new Date()
    maxBirthDate.setFullYear(maxBirthDate.getFullYear() - 10)
    const [dateOfBirth, setDateOfBirth] = useState<Date>(maxBirthDate);

    const inputsStacked = useIsMobile(720);
    const isFullscreen = useIsMobile(1200);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Submitted")
    }

    return (
        <>
            <AuthForm>
                {formType === "register" ? (
                    <h1>Register</h1>
                ) : (
                        <h1>Login</h1>
                    )}
                {formType === "register" && (<>
                    <div className="meta-inputs">
                        <DateInput label="Date Of Birth (optional)" style={inputsStacked ? { width: "100%" } : { width: "60%" }} minDate={minBirthDate} maxDate={maxBirthDate} date={dateOfBirth} setDate={setDateOfBirth} />
                        <SelectionInput label="Gender" style={inputsStacked ? { width: "100%" } : { width: "35%" }} selection={gender} setSelection={setGender} values={genders} optional />
                    </div>
                </>
                )}
                <Button bold>{formType === "register" ? "Register" : "Log In"}</Button>
            </AuthForm>
            {isFullscreen && (
                <div style={{ textAlign: "center" }}>
                    <h2>Want to publish your own apps?</h2>
                    <Link href="/dev/register">
                        <Button big bold color={theme.navy}>Register as a Developer</Button>
                    </Link>
                </div>
            )}
        </>
    )
}