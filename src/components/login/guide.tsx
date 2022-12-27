import styled from 'styled-components';

import useI18n from '@hooks/useI18n';
import { I18N_AUTH_LOGIN } from '@constants/i18n-namespace';

const Container = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  width: calc(100% - 600px - 1.875rem);
`;

const GuideImage = styled.img`
  width: 300px;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.color.G80};
  font-size: 2.25rem;
  font-weight: 600;
  margin-top: 3rem;
`;

const Message = styled.p`
  margin-top: 2rem;
  font-weight: 500;
  line-height: 1.3;
`;

export default function LoginGuide() {
  const { i18n } = useI18n(I18N_AUTH_LOGIN);

  return (
    <Container>
      <GuideImage src="/images/login-icon.png" alt="login" />
      <Title>{i18n('guide.title')}</Title>
      <Message>{i18n('guide.message')}</Message>
    </Container>
  );
}
