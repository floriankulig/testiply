import { DateInput } from "components/auth/DateInput";
import { AuthForm, MultilevelForm, TextInput } from "components/forms";
import { AuthLayout } from "components/layouts";
import { SelectionInput } from "components/SelectionInput";
import { useIsMobile } from "hooks";
import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { Gender, genders } from "ts";

const DevRegister: NextPage = () => {
    const formNames = ["first", "second", "third", "fourth"]
    const [activeForm, setActiveForm] = useState<string>(formNames[0]);

    //Form input State
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [showPasswords, setShowPasswords] = useState<boolean>(false);
    const [gender, setGender] = useState<Gender>("male");

    const minBirthDate = new Date("1900-01-01")
    let maxBirthDate = new Date()
    maxBirthDate.setFullYear(maxBirthDate.getFullYear() - 10)
    const [dateOfBirth, setDateOfBirth] = useState<Date>(maxBirthDate);

    const inputsStacked = useIsMobile(720);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Submitted")
    }

    return (
        <>
            <Head>
                <title>Register as a Dev | Beta App Store</title>
            </Head>
            <AuthLayout formType="dev_register">
                <MultilevelForm
                    setActiveForm={setActiveForm}
                    formNames={formNames}
                    handleSubmit={handleSubmit}
                >
                    <h1>Register as a Dev</h1>

                    <TextInput
                        inputType="text"
                        value={email}
                        setValue={setEmail}
                        svg={<MdEmail />}
                        placeholder="Enter your E-Mail Address"
                    >
                        E-Mail Address
                    </TextInput>
                    <TextInput
                        inputType={showPasswords ? "text" : "password"}
                        value={password}
                        setValue={setPassword}
                        svg={showPasswords ? <AiFillEyeInvisible /> : <AiFillEye />}
                        placeholder="Must be at least 8 characters"
                        svgClickHandler={() => setShowPasswords(prev => !prev)}
                    >
                        Password
                    </TextInput>
                    <TextInput
                        inputType={showPasswords ? "text" : "password"}
                        value={confirmPassword}
                        setValue={setConfirmPassword}
                        svg={showPasswords ? <AiFillEyeInvisible /> : <AiFillEye />}
                        placeholder="Must be at least 8 characters"
                        svgClickHandler={() => setShowPasswords(prev => !prev)}
                    >
                        Confirm Password
                    </TextInput>
                    <div className="meta-inputs">
                        <DateInput label="Date Of Birth" minDate={minBirthDate} style={inputsStacked ? { width: "100%" } : { width: "60%" }} maxDate={maxBirthDate} date={dateOfBirth} setDate={setDateOfBirth} />
                        <SelectionInput label="Gender" style={inputsStacked ? { width: "100%" } : { width: "35%" }} selection={gender} setSelection={setGender} values={genders} />
                    </div>
                </MultilevelForm>
            </AuthLayout>
        </>
    )
}

export default DevRegister