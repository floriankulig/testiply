import styled from "styled-components";
import Image from "next/image";
import { rgba } from "polished";

export const SectionHeader = styled.h1`
  text-align: center;
  font-size: clamp(34px, 5vw, 52px);
  margin-top: 5em;
  margin-bottom: 3em;

  @media (${({ theme }) => theme.bp.big}) {
    margin-bottom: 2em;
  }
`;

const Benefit = styled.li`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5em;

  @media (${({ theme }) => theme.bp.big}) {
    flex-direction: row;
    padding-right: clamp(0.1em, 5vw, 5em);
  }

  &:nth-of-type(even) {
    @media (${({ theme }) => theme.bp.big}) {
      flex-direction: row-reverse;
      padding-right: 0;
      padding-left: clamp(0.1em, 7vw, 7em);
    }
  }
`;

const BenefitImageWrapper = styled.div`
  max-width: 100%;

  @media (${({ theme }) => theme.bp.small}) {
    max-height: 400px;
    width: 45%;
  }
`;

const BenefitDescription = styled.div`
  margin-top: 2em;
  margin-bottom: 2em;
  max-width: 100%;
  /* background: #e5e5e5; */

  @media (${({ theme }) => theme.bp.small}) {
    width: clamp(450px, 30vw, 550px);
  }

  h2 {
    color: var(--primary);
    margin-bottom: 0.5em;
    font-size: clamp(1.5rem, 4vw, 2.25rem);
  }
  p {
    color: ${({ theme }) => rgba(theme.navy, 0.7)};
    max-width: 50ch;
  }
`;

export const Benefits: React.FC = () => {
  return (
    <>
      <SectionHeader className="container">
        Benefits for Publishers
      </SectionHeader>
      <ul className="container">
        <Benefit>
          <BenefitImageWrapper>
            <Image
              src="/images/bug_fixing.svg"
              alt="Fix Bugs"
              width={560}
              height={400}
            />
          </BenefitImageWrapper>
          <BenefitDescription>
            <h2>Find Bugs, Eliminate Them</h2>
            <p>
              Large amounts of testers allow you to find bugs faster. <br /> Not
              having to set up expensive servers to host and evaluate
              A-/B-Testing data, you can get valueable responses from your
              future users - even in your apps’s beta-phase.
            </p>
          </BenefitDescription>
        </Benefit>
        <Benefit>
          <Image
            src="/images/attention.svg"
            alt="Aquire Users"
            width={560}
            height={400}
          />
          <BenefitDescription className="even">
            <h2>Grab Attention, Aquire Users</h2>
            <p>
              While you as the developer can fully focus on enhancing your app’s
              experience, we provide you a large platform to promote your app. A
              well-rated app will attract future users who are looking for new,
              innovative apps.
            </p>
          </BenefitDescription>
        </Benefit>
      </ul>
    </>
  );
};
