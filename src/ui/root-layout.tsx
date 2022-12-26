import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';

const RootContainer = styled.main<{ backgroundColor?: string }>`
  position: relative;
  max-width: 768px;
  margin: -1px auto 0 auto;
  padding-top: 1px;
  background-color: ${({ backgroundColor }) => backgroundColor || 'unset'};
`;

interface RootLayoutProps {
  children: React.ReactNode;
  metaTitle: string;
  backgroundColor?: string;
}

export default function RootLayout({ children, metaTitle, backgroundColor }: RootLayoutProps) {
  return (
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
      {children}
    </RootContainer>
  );
}
