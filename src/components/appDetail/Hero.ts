import { StyledClickableDropdown } from "components/ClickableDropdown";
import { rgba } from "polished";
import styled from "styled-components";

const HeroSection = styled.section`
  margin-top: 3em;
  margin-bottom: 2em;
  @media (${({ theme }) => theme.bp.medium}) {
    margin-top: 4em;
    margin-bottom: 4em;
  }
  ${StyledClickableDropdown} {
    opacity: 0;
    animation: fadeUp 0.4s var(--easing) forwards 0.2s;
  }
  h1.section-header {
    margin-top: 2em;
    font-size: clamp(1.4rem, 3vw, 2rem);
    color: ${({ theme }) => rgba(theme.navy, 0.8)};
  }
`;
const StyledRow = styled.div`
  max-height: 200px;
  margin-top: 2em;
  display: flex;
`;

const IconWrapper = styled.div`
  width: clamp(120px, 25vw, 200px);
  height: clamp(120px, 25vw, 200px);
  min-width: 120px;
  min-height: 120px;
  border-radius: 20%;
  user-select: none;
  img.icon {
    border-radius: 20%;
  }
`;

const MetaInfo = styled.div`
  padding: 0.5em 0;
  margin-left: clamp(0.75em, 3vw, 1.5em);
  max-height: 200px;
  display: flex;
  flex-direction: column;
  h1 {
    font-size: clamp(30px, 5vw, 60px);
    margin: 0;
    color: var(--navy);
  }
  h3 {
    color: var(--primary);
    font-size: clamp(16px, 2vw, 20px);
    margin: 0.75em 0;
    width: max-content;
    flex-wrap: wrap;
  }
  ${StyledClickableDropdown} {
    margin-top: auto;
  }
`;

const Description = styled.p`
  margin-bottom: 4em;
  color: ${({ theme }) => rgba(theme.navy, 0.8)};
  max-width: 80ch;
`;

export { HeroSection, IconWrapper, MetaInfo, StyledRow, Description };
