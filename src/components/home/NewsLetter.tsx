import { Button } from "components/Button";
import { ErrorMessage } from "components/ErrorMessage";
import { InfoCard } from "components/InfoCard";
import { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { MdError } from "react-icons/md";
import styled from "styled-components";
import { rgba } from "polished";
import { SectionHeader } from "./Benefits";
import { postData } from "lib";

const StyledInput = styled.div`
    background-color: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    border-radius: ${({ theme }) => theme.borderRadius};
    border: 2px solid lightgrey;
    width: 100%;
    @media (${({ theme }) => theme.bp.small}){
        width: 400px;
    }

    input {
        border: 0;
        border-radius: 5px;
        background: transparent;
        outline: none;
        font-size: 1.2rem;
        margin-left: 8px;
        transition: all 0.25s ease;
        width: 90%;

        &:focus {
            padding-left: 5px;
            padding-right: 0px;
            & ~ svg {
                transform: translate(0, -8px);
                box-shadow: 0px 8px 20px 0px rgba(0, 0, 0, 0.15);
            }
        }
        &:invalid {
            box-shadow: none;
        }
    }

    svg {
        order: -1;
        background: #ffffff;
        border-radius: ${({ theme }) => theme.borderRadius};
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        padding: 5px;
        transition: all 0.25s ease;
    }

    .bg {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 1;
        left: 0;
        top: 0;
        pointer-events: none;
        border-radius: inherit;
        box-sizing: border-box;
        border: 2px solid transparent;
        transition: all 0.25s ease;
    }
`

const NewsletterSection = styled.div`
    margin-top: 15em;
    height: 20em;

    // Media query corresponds to InfoCard styles, where card is open
    @media (min-width: 450px){
        h1 {
            margin-bottom: 1em;
        }
    }

    div.content{
        width: 100%;
        margin: 0 auto;
        
        @media (${({ theme }) => theme.bp.small}){
            width: 400px;
        }

        button{
            border-radius: ${({ theme }) => theme.borderRadius};
            background-color: ${({ theme }) => theme.primary};
            margin-top: 1em;
            color: #fff;
            width: 100%;
            @media (${({ theme }) => theme.bp.small}){
                width: 400px;
            }
            box-shadow:5px 8px 20px ${({ theme }) => rgba(theme.primary, .25)};
        }   
    }
`;

export const NewsLetter: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        event.preventDefault();
        setEmail(event.target.value);
        setErrorMessage("")
    }

    const onSubmit = (event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>): void => {
        event.preventDefault();

        //Validate formatting of email-address
        const inputElement: any = document.getElementById("newsletterEmailInput")
        if (!inputElement.validity.valid || !email) {
            setErrorMessage("Please put in a valid E-Mail Address.")
            return;
        } else {
            setErrorMessage("")
        }

        postData("https://api.beta-app-store.com/newsletterregister", { email: "test@mail.com" }).then((data) => console.log(data)) //normalerweise {email: email}
    }

    return (
        <NewsletterSection className="container">
            <SectionHeader>Subscribe To Our Newsletter</SectionHeader>
            <div className="content">
                <InfoCard>
                    <h1>What you'll get:</h1>
                    <p>Updates on our state of development</p>
                    <p>App recommendations</p>
                    <p>Notifications for recently released features</p>
                </InfoCard>
                <StyledInput>
                    <input
                        id="newsletterEmailInput"
                        onChange={(e) => handleChange(e)}
                        value={email} type="email"
                        placeholder="Put in your E-Mail Address"
                    />
                    <AiOutlineMail />
                    <div className="bg" />
                </StyledInput>
                {errorMessage && <ErrorMessage><MdError />{errorMessage}</ErrorMessage>}
                <Button onClick={(e) => onSubmit(e)} onKeyDown={(e) => onSubmit(e)} aria-label="Sign Up for our newsletter.">
                    Join Now!
                </Button>
            </div>
        </NewsletterSection>
    )
}
