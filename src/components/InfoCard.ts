import styled from "styled-components";

export const InfoCard = styled.div`
  background: #0012ff;
  padding: 1em;
  border-radius: 10px;
  margin-bottom: -5em;
  width: 400px;
  max-width: 100%;
  clip-path: circle(30px at 92.3% 19%);
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    clip-path: circle(75%);
    background: #00b6ff;
    margin-bottom: 1em;
  }

  h1 {
    color: white;
    margin: 0;
  }

  p {
    color: white;
    font-size: 0.8rem;
    max-width: 95%;
  }

  span {
    float: right;
    color: white;
    font-size: 30px;
    font-weight: bold;
    transition: color 0.5s;
    position: relative;
    margin-right: 2.5%;
  }
  &:hover span {
    color: rgba(255, 255, 255, 0);
  }
`;
