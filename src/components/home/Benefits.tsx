import styled from "styled-components"

export const SectionHeader = styled.h1`
    text-align: center;
    font-size: clamp(36px, 5vw, 52px);
    margin-top: 5em;
    margin-bottom: 3em;
`

const Benefit = styled.li`
    width:100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5em;

    @media (min-width: 1201px) {
        flex-direction: row;
        padding-right: clamp(0.1em, 2vw,5em);
    }

    img{
        max-width:100%;

        @media (min-width: 721px){
            max-height: 400px;
            width:45%;
            margin-left:10%;
            margin-right: auto;
        }

        @media (min-width: 1201px){
            margin: 0;
        }
    }

    &:nth-of-type(even){
        @media (min-width: 1201px) {
            flex-direction: row-reverse;
            padding-right: 0;
            padding-left:clamp(0.1em, 2vw,5em);
        }

        img{
            max-width:100%;

            @media (min-width: 721px){
                margin-left: auto;
                margin-right: 10%;
            }

            @media (min-width: 1201px){
                margin: 0;
            }
        }
    }

    
`

const BenefitDescription = styled.div`
    margin-top: 2em;
    margin-bottom: 2em;
    max-width: 100%;

    @media (min-width: 721px){
        width: clamp(450px, 30vw,550px);
        margin-left: auto;
        margin-right: 5%;
    }

    @media (min-width: 1201px){
        margin: 0;
    }

    &.even {
        @media (min-width: 721px){
            margin-left: 5%;
            margin-right: auto;
        }

        @media (min-width: 1201px){
            margin: 0;
        }
    }

    h2 {
        color: #6C63FF;
        font-size: clamp(1.5rem,4vw,2.25rem);
    }
`


export const Benefits: React.FC = () => {
    return (
        <>
            <SectionHeader className="container">Benefits for Publishers</SectionHeader>
            <ul className="container">
                <Benefit>
                    <img src="/images/bug_fixing.svg" alt="Fix Bugs" />
                    <BenefitDescription>
                        <h2>Find Bugs, Eliminate Them</h2>
                        <p>Large amounts of testers allow you to find bugs faster. <br /> Not having to set up expensive servers to host and evaluate A-/B-Testing data, you can get valueable responses from your future users - even in your apps’s beta-phase.</p>
                    </BenefitDescription>
                </Benefit>
                <Benefit>
                    <img src="/images/attention.svg" alt="Aquire Users" />
                    <BenefitDescription className="even">
                        <h2>Grab Attention, Aquire Users</h2>
                        <p>While you as the developer can fully focus on enhancing your app’s experience, we provide you a large platform to promote your app. A well-rated app will attract future users who are looking for new, innovative apps.</p>
                    </BenefitDescription>
                </Benefit>
            </ul>
        </>
    )
}
