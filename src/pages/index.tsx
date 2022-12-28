import useFetchMe from '@apis/users/queries/fetch-me';
import Router from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const { data: meData } = useFetchMe();

  useEffect(() => {
    if (meData?.me) {
      Router.replace('/countries/[country]/dashboard', '/countries/all/dashboard');
    }
  }, [meData]);

  return <div />;
}
