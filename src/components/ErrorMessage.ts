import styled from "styled-components";

export const ErrorMessage = styled.p`
  color: red;
  padding: 5px 10px;
  border: 1px solid red;
  border-radius: 5px;
  width: max-content;
  margin-bottom: 0;
  max-width: 100%;

  svg {
    width: 20px;
    height: 20px;
    transform: translateY(3px);
    margin-right: 5px;
  }
`;
