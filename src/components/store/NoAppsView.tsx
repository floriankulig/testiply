import Image from "next/image";
import { lighten } from "polished";
import styled from "styled-components";

const ViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 5%;
  width: 90%;
  grid-column: 1/-1;
  @media (${({ theme }) => theme.bp.big}) {
    margin: 0 30%;
    width: 40%;
    max-height: 100%;
  }

  img,
  h3 {
    opacity: 0;
    animation: fadeUp 0.5s var(--easing) forwards;
  }
  h3 {
    animation-delay: 0.1s;
    text-align: center;
    color: ${({ theme }) => lighten(0.3, theme.navy)};
    font-size: 2rem;
  }
`;

interface NoAppsViewProps {
  hasApps: boolean;
}
export const NoAppsView: React.FC<NoAppsViewProps> = ({ hasApps }) => {
  const msg = hasApps
    ? "No apps corresponding to this search."
    : "No apps in this category yet.";
  return (
    <ViewContainer>
      <Image
        src="/images/empty_store.svg"
        layout="intrinsic"
        width={1080}
        height={900}
        alt="Man Holding Empty Package"
      />
      <h3>{msg}</h3>
    </ViewContainer>
  );
};
