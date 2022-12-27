import styled from 'styled-components';

import LoginGuide from '@components/login/guide';
import LoginForm from '@components/login/form';

const Container = styled.div`
  background-image: url('/images/login-bg.png');
  background-repeat: no-repeat;
  background-size: 110% 110%;
  width: 100%;
  min-height: 100vh;
  padding: 1.875rem;
  display: flex;
  gap: 1.25rem;
`;

export default function Login() {
  return (
    <Container>
      <LoginGuide />
      <LoginForm />
    </Container>
  );
}
