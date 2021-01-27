import { Button } from "components/Button";
import { InfoFooter } from "components/InfoFooter";
import { InfoPageHeader } from "components/InfoPageHeader";
import { capitalized, getPathname, getTextColor } from "helpers";
import { useStaticJSON } from "hooks";
import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import styled from "styled-components";
import { theme } from "styles";

const Content = styled.div`
    margin-top: 1em;
    span {
        font-size: 1.5rem;
        color: #a5a5a5;
    }

    ${Button}{
        margin-top: 1em;
    }
`;
const ContentBlock = styled.div`
    margin-bottom: 3em;
    &:first-of-type {
        margin-top: 2em;
    }
    h2{
        color: ${({ theme }) => theme.primary};
        margin-bottom: 0.5em;
    }
    p {
        margin: 0;
    }
`;

interface Paragraph {
    title: string;
    text: string;
}

const Imprint: NextPage = () => {
    const [lang, setLang] = useState<"en" | "de">("en")
    const paragraphs = useStaticJSON(lang, "imprint")

    const toggleLang = () => setLang(lang === "de" ? "en" : "de")
    const buttonText = lang === "de" ? "Zu Englisch wechseln" : "Switch to German"
    const pathname = getPathname()

    return (
        <>
            <Head>
                <title>Imprint | Beta App Store</title>
            </Head>
            <InfoPageHeader className="container" style={{
                color: getTextColor(theme.layoutContentBg)
            }} />
            <Content className="container">
                {pathname.map(link => (
                    <span>/ {capitalized(link)}</span>
                ))}
                {paragraphs && paragraphs.map((paragraph: Paragraph) => (
                    <ContentBlock>
                        <h2>{paragraph.title}</h2>
                        {paragraph.text.split("\n").map(text => (
                            <p>{text}</p>
                        ))}
                    </ContentBlock>
                ))}
                <Button big onClick={toggleLang} onKeyDown={toggleLang} aria-label="Toggle language">{buttonText}</Button>
            </Content>
            <InfoFooter />
        </>
    )
}


export default Imprint