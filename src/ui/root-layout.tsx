import React, { useEffect } from 'react';
import Head from 'next/head';
import styled, { css } from 'styled-components';
import Router from 'next/router';

import LayoutHeader from '@components/layout/header';
import useFetchMe from '@apis/users/queries/fetch-me';
import LayoutNavigation from '@components/layout/navigation';
import LayoutMainSectionMenu from '@components/layout/main-section-menu';

const RootContainer = styled.div<{ backgroundColor?: string }>`
  position: relative;
  margin: 0 auto;
  background-color: ${({ backgroundColor }) => backgroundColor || 'unset'};
`;

const Main = styled.main<{ isLoginPage: boolean }>`
  position: relative;

  ${({ isLoginPage }) =>
    !isLoginPage &&
    css`
      left: 100px;
      width: calc(100% - 100px);
      padding: 2rem;
    `};
`;

interface RootLayoutProps {
  children: React.ReactNode;
  metaTitle: string;
  backgroundColor?: string;
  isLoginPage?: boolean;
  hideMainSectionMenu?: boolean;
}

export default function RootLayout({
  children,
  metaTitle,
  backgroundColor,
  isLoginPage = false,
  hideMainSectionMenu = false,
}: RootLayoutProps) {
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
          {!isLoginPage && (
            <>
              <LayoutHeader me={meData.me} />
              <LayoutNavigation />
            </>
          )}
          <Main isLoginPage={isLoginPage}>
            {!hideMainSectionMenu && !isLoginPage && <LayoutMainSectionMenu />}
            {children}
          </Main>
        </RootContainer>
      )}
    </>
  );
}
