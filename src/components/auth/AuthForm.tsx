import { Button } from "components/Button";
import { FormInput, SVGWrapper, TextField } from "components/FormInput";
import { SelectionInput } from "components/auth/SelectionInput";
import { rgba } from "polished";
import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import styled from "styled-components"
import { FormType, Gender, genders } from "ts"
import { DateInput } from "./DateInput";

const Container = styled.div`
    width: calc(100vw - var(--auth-sidebar-width));
    background-color: var(--layout-content-background);
    display: grid;
    place-items: center; 
`;

const Form = styled.form`
    min-height: 50vh;
    width: 50%;
    padding: 4em 6em;
    border-radius: 4em;
    background-color: var(--layout-nav-background);
    box-shadow: 10px 30px 80px ${p => rgba(p.theme.navy, 0.1)};

    h1{
        margin: 0;
        margin-bottom: 1.5em;
    }

   .optionals {
       width: 100%;
       display: flex;
       justify-content: space-between;
    }

    ${Button} {
        margin-top: 3em;
    }
`;


interface AuthFormProps {
    formType: FormType;
}

export const AuthForm: React.FC<AuthFormProps> = ({ formType }) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [showPasswords, setShowPasswords] = useState<boolean>(false);
    const [gender, setGender] = useState<Gender | null>(null);

    const minBirthDate = new Date("1900-01-01")
    let maxBirthDate = new Date()
    maxBirthDate.setFullYear(maxBirthDate.getFullYear() - 10)
    const [dateOfBirth, setDateOfBirth] = useState<Date>(maxBirthDate);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <Container>
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
                    <div className="optionals">
                        <DateInput style={{ width: "60%" }} minDate={minBirthDate} maxDate={maxBirthDate} date={dateOfBirth} setDate={setDateOfBirth} />
                        <SelectionInput style={{ width: "35%" }} selection={gender} setSelection={setGender} values={genders} optional />
                    </div>
                </>
                )}
                <Button bold>{formType === "register" ? "Register" : "Log In"}</Button>
            </Form>
        </Container>
    )
}