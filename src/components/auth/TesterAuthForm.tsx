import { Button } from "components/Button";
import { FormInput, SVGWrapper, TextField } from "components/forms";
import { SelectionInput } from "components/SelectionInput";
import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { FormType, Gender, genders } from "ts"
import { DateInput } from "./DateInput";
import { useIsMobile } from "hooks";
import Link from "next/link";
import { theme } from "styles";
import styled from "styled-components";
import { rgba } from "polished";

const Form = styled.form`
  min-height: 50vh;
  width: clamp(1px, 90%, 650px);
  border-radius: 4em;
  padding: 4em 3em;
  margin: 5em 0;
  background-color: var(--layout-nav-background);
  box-shadow: 10px 30px 80px ${(p) => rgba(p.theme.navy, 0.1)};
  @media (${({ theme }) => theme.bp.small}) {
    padding: 4em 6em;
  }

  h1 {
    margin: 0;
    margin-bottom: 1.5em;
  }

  .meta-inputs {
    width: 100%;
    // same as FormInputs
    max-width: 600px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    @media (${({ theme }) => theme.bp.small}) {
      flex-direction: row;
    }
  }

  ${Button} {
    margin-top: 2em;
    @media (${({ theme }) => theme.bp.small}) {
      margin-top: 3em;
    }
  }
`;


interface TesterAuthFormProps {
    formType: FormType;
}

export const TesterAuthForm: React.FC<TesterAuthFormProps> = ({ formType }) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
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
    }

    return (
        <>
            <Form onSubmit={(e) => handleSubmit(e)}>
                {formType === "register" ? (
                    <h1>Register</h1>
                ) : (
                        <h1>Login</h1>
                    )}
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
                {formType === "register" && (<>
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
                        <DateInput label="Date Of Birth (optional)" style={inputsStacked ? { width: "100%" } : { width: "60%" }} minDate={minBirthDate} maxDate={maxBirthDate} date={dateOfBirth} setDate={setDateOfBirth} />
                        <SelectionInput label="Gender" style={inputsStacked ? { width: "100%" } : { width: "35%" }} selection={gender} setSelection={setGender} values={genders} optional />
                    </div>
                </>
                )}
                <Button bold>{formType === "register" ? "Register" : "Log In"}</Button>
            </Form>
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