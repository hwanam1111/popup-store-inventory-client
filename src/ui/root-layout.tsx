import React, { useEffect } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Router from 'next/router';

import LayoutHeader from '@components/layout/header';
import useFetchMe from '@apis/users/queries/fetch-me';

const RootContainer = styled.div<{ backgroundColor?: string }>`
  position: relative;
  margin: 0 auto;
  background-color: ${({ backgroundColor }) => backgroundColor || 'unset'};
`;

interface RootLayoutProps {
  children: React.ReactNode;
  metaTitle: string;
  backgroundColor?: string;
  isLoginPage?: boolean;
}

export default function RootLayout({ children, metaTitle, backgroundColor, isLoginPage = false }: RootLayoutProps) {
  const { data: meData } = useFetchMe();

  useEffect(() => {
    if (meData?.ok && meData.me === null) {
      Router.replace('/auth/login');
    }
  }, [meData]);

  return (
    <>
      {(isLoginPage || meData?.me) && (
        <RootContainer backgroundColor={backgroundColor}>
          <Head>
            <meta charSet="UTF-8" />
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8;" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no user-scalable=no minimum-scale=1"
            />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="author" content="LEEJUN KIM" />
            <meta name="description" content="팝업스토어 재고관리" />
            <title>{metaTitle}</title>
          </Head>
          {!isLoginPage && <LayoutHeader me={meData.me} />}
          <main>{children}</main>
        </RootContainer>
      )}
    </>
  );
}
