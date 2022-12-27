import { useEffect } from 'react';
import Router from 'next/router';

import { I18N_HOME } from '@constants/i18n-namespace';
import useI18n from '@hooks/useI18n';
import useFetchMe from '@apis/users/queries/fetch-me';

export default function Home() {
  const { i18n } = useI18n(I18N_HOME);
  const { data: meData } = useFetchMe();
  console.log('>> meData : ', meData);

  useEffect(() => {
    if (meData?.ok && meData.me === null) {
      Router.replace('/auth/login');
    }
  }, [meData]);

  return <div>{meData?.ok && meData?.me && <h1>{i18n('title')}</h1>}</div>;
}
