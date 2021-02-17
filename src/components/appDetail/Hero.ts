import { StyledClickableDropdown } from "components/ClickableDropdown";
import styled from "styled-components";
const HeroSection = styled.section`
  margin-top: 3em;
  margin-bottom: 2em;
  @media (${({ theme }) => theme.bp.medium}) {
    margin-top: 4em;
    margin-bottom: 4em;
  }
  ${StyledClickableDropdown} {
    // after name and dev
    opacity: 0;
    animation: fadeUp 0.5s var(--easing) forwards 0.4s;
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
  opacity: 0;
  animation: fadeUp 0.5s var(--easing) forwards 0.1s;
`;

const MetaInfo = styled.div`
  padding: 0.5em 0;
  margin-left: 1.5em;
  max-height: 200px;
  display: flex;
  flex-direction: column;
  h1 {
    font-size: clamp(30px, 5vw, 60px);
    margin: 0;
    color: var(--navy);
    opacity: 0;
    animation: fadeUp 0.5s var(--easing) forwards 0.2s;
  }
  h3 {
    color: var(--primary);
    font-size: clamp(16px, 2vw, 20px);
    margin: 0.75em 0;
    width: max-content;
    flex-wrap: wrap;
    opacity: 0;
    animation: fadeUp 0.5s var(--easing) forwards 0.3s;
  }
  ${StyledClickableDropdown} {
    margin-top: auto;
  }
`;

export { HeroSection, IconWrapper, MetaInfo, StyledRow };
