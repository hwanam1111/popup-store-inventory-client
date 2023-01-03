import styled from 'styled-components';

import useI18n from '@hooks/useI18n';
import { I18N_PRODUCT_FORWARDING } from '@constants/i18n-namespace';

const Container = styled.div`
  padding: 2rem 1rem;

  & > h1 {
    font-size: 1.25rem;
  }
`;

export default function CannotBeDone() {
  const { i18n } = useI18n(I18N_PRODUCT_FORWARDING);

  return (
    <Container>
      <h1>{i18n('cannot-be-done')}</h1>
    </Container>
  );
}
