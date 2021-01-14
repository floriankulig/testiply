import { Button } from 'components/Button';
import { rgba } from 'polished';
import styled from 'styled-components';

export const Form = styled.form`
  min-height: 50vh;
  width: clamp(1px, 90%, 650px);
  border-radius: 4em;
  padding: 4em 3em;
  margin: 5em 0;
  background-color: var(--layout-nav-background);
  box-shadow: 10px 30px 80px ${(p) => rgba(p.theme.navy, 0.1)};
  @media (${({ theme }) => theme.bp.small}) {
    padding: 4em 6em;
  }

  h1 {
    margin: 0;
    margin-bottom: 1.5em;
  }

  .meta-inputs {
    width: 100%;
    // same as FormInputs
    max-width: 600px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    @media (${({ theme }) => theme.bp.small}) {
      flex-direction: row;
    }
  }

  ${Button} {
    margin-top: 2em;
    @media (${({ theme }) => theme.bp.small}) {
      margin-top: 3em;
    }
  }
`;
