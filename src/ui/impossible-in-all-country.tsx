import styled from 'styled-components';

import useI18n from '@hooks/useI18n';
import { I18N_COMMON } from '@constants/i18n-namespace';

const Container = styled.div`
  padding: 2rem 1rem;

  & > h1 {
    font-size: 1.25rem;
  }
`;

interface ImpossibleInAllCountryProps {
  i18nAccessProductKey:
    | 'cannot-forwarding-product'
    | 'cannot-cancel-product'
    | 'cannot-defective-product'
    | 'cannot-damaged-product';
}

export default function ImpossibleInAllCountry({ i18nAccessProductKey }: ImpossibleInAllCountryProps) {
  const { i18n } = useI18n(I18N_COMMON);

  return (
    <Container>
      <h1>{i18n(`impossible-in-all-country.${i18nAccessProductKey}`)}</h1>
    </Container>
  );
}
