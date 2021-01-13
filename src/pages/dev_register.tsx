import { Container, Form } from "components/auth/AuthForm";
import { Button } from "components/Button";
import { SelectionInput } from "components/SelectionInput";
import { DateInput } from "components/auth/DateInput";
import { FormInput, SVGWrapper, TextField } from "components/FormInput";
import { AuthLayout } from "components/layouts";
import { useIsMobile } from "hooks";
import { NextPage } from "next";
import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { Gender, genders } from "ts";

const DevRegister: NextPage = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [showPasswords, setShowPasswords] = useState<boolean>(false);

    const [gender, setGender] = useState<Gender | null>("male");

    const minBirthDate = new Date("1900-01-01")
    let maxBirthDate = new Date()
    maxBirthDate.setFullYear(maxBirthDate.getFullYear() - 10)
    const [dateOfBirth, setDateOfBirth] = useState<Date>(maxBirthDate);

    const inputsStacked = useIsMobile(720);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <AuthLayout formType="dev_register">
            <Container>
                <Form onSubmit={(e) => handleSubmit(e)}>
                    <h1>Register as a Developer</h1>
                    <FormInput>
                        Email
                        <TextField>
                            <input
                                type="email"
                                value={email}
                                placeholder="E-Mail Address"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <SVGWrapper>
                                <MdEmail />
                            </SVGWrapper>
                        </TextField>
                    </FormInput>
                    <FormInput>
                        Password
                        <TextField>
                            <input
                                type={showPasswords ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <SVGWrapper
                                onClick={() => setShowPasswords(prev => !prev)}
                                onKeyDown={() => setShowPasswords(prev => !prev)}
                                clickable
                            >
                                {showPasswords ? <AiFillEyeInvisible /> : <AiFillEye />}
                            </SVGWrapper>
                        </TextField>
                    </FormInput>
                    <FormInput>
                        Confirm Password
                        <TextField>
                            <input
                                type={showPasswords ? "text" : "password"}
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <SVGWrapper
                                onClick={() => setShowPasswords(prev => !prev)}
                                onKeyDown={() => setShowPasswords(prev => !prev)}
                                clickable
                            >
                                {showPasswords ? <AiFillEyeInvisible /> : <AiFillEye />}
                            </SVGWrapper>
                        </TextField>
                    </FormInput>
                    <div className="meta-inputs">
                        <DateInput label="Date Of Birth" style={inputsStacked ? { width: "100%" } : { width: "60%" }} minDate={minBirthDate} maxDate={maxBirthDate} date={dateOfBirth} setDate={setDateOfBirth} />
                        <SelectionInput label="Gender" style={inputsStacked ? { width: "100%" } : { width: "35%" }} selection={gender} setSelection={setGender} values={genders} />
                    </div>
                    <Button bold>Register</Button>
                </Form>
            </Container>
        </AuthLayout>
    )
}

export default DevRegister