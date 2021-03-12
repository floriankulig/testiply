import { AiOutlineInfoCircle } from "react-icons/ai";
import styled from "styled-components";

const StyledInfoNote = styled.div`
  border-radius: 6px;
  border: 1px solid #9e9e9e;
  color: #979797;
  padding: 0.75em 1em;
  display: flex;
  align-items: center;
  svg {
    margin-right: 0.4em;
    height: 35px;
    width: 35px;
  }
`;

interface InfoNoteProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const InfoNote: React.FC<InfoNoteProps> = ({
  children,
  className,
  style,
}) => {
  return (
    <StyledInfoNote style={style} className={className}>
      <AiOutlineInfoCircle />
      {children}
    </StyledInfoNote>
  );
};
