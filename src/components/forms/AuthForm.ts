import { Button } from 'components/Button';
import { ContentHolder } from 'components/forms/FormikCheckbox';
import { rgba } from 'polished';
import styled from 'styled-components';

export const AuthForm = styled.div`
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

  .link {
    color: var(--primary);
  }

  ${ContentHolder} {
    margin-top: 1em;
  }

  ${Button} {
    margin-top: 2em;
    @media (${({ theme }) => theme.bp.small}) {
      margin-top: 3em;
    }
  }
`;
