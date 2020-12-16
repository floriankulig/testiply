import { useOnClickOutside } from "hooks";
import { useRef, useState } from "react";
import styled from "styled-components";

const StyledInfoCard = styled.div`
  border-radius: 10px;
  width: 400px;
  max-width: 100%;
  margin-bottom: 2em;
  margin-left: auto;
  margin-right: 0;
  position: relative;
  transition: all 0.4s ease-in-out;

  @media (min-width: 450px){
    clip-path: circle(10% at 90% 20.5%);
    margin-bottom: -4.5em;
    background: ${({ theme }) => theme.colors.primary};
    padding: 1em;
    cursor: pointer;

    &:hover, 
    &.open{
      clip-path: circle(75%);
      background: #2F2E41;
      margin-bottom: 1em;
      transform: translateX(0);
      cursor: default;

      span{
        color: rgba(255, 255, 255, 0);
      }
    }
  }

  @media (${({ theme }) => theme.bp.small}){
    transform: translateX(-40%);
  }

  h1 {
    margin: 0;
    color: black;
    font-size: 1.5rem;
    @media (min-width: 450px){
      color: white;
    }
    margin-bottom: 1.2em;
  }

  p {
    font-size: 0.9rem;
    max-width: 95%;
    margin: 0;
    color: black;

    &:first-of-type{
      margin-top: 2em;
    }

    &:before{
      content: '● ';
    }

    @media (min-width: 450px){
      color: white;
    }
  }

  span {
    position: absolute;
    top: 10%;
    right: 9%;
    font-size: 30px;
    font-weight: bold;
    transition: color 0.5s;
    color: rgba(255, 255, 255, 0);

    @media (min-width: 450px){
      color: white;
    }
  }
`;

export const InfoCard: React.FC = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>();

  useOnClickOutside(ref, () => setOpen(false))

  return (
    <StyledInfoCard
      className={open ? "open" : undefined}
      onClick={() => setOpen(true)}
      onKeyDown={() => setOpen(true)}
      role="button"
      aria-label="Open infocard for Newsletter."
      ref={ref}
    >
      <span>i</span>
      {children}
    </StyledInfoCard>
  )
}