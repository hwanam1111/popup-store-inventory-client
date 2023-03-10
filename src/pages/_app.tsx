import React, { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import NextNProgress from 'nextjs-progressbar';
import Cookies from 'universal-cookie';
import setLanguage from 'next-translate/setLanguage';

import { COOKIE_NEXT_LOCALE } from '@constants/cookie-namespace';
import LocalStorage from '@utils/local-storage';
import { TIMEZONE } from '@constants/local-storage-keys';
import timezones from '@constants/timezones';

import ResetStyles from '@styles/reset';
import GlobalStyles from '@styles/global';
import theme from '@styles/theme';
import SweetAlert2Styles from '@styles/sweet-alert2';
import { ThemeProvider } from '@styles/theme-component';

import 'react-lazy-load-image-component/src/effects/blur.css';

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const cookies = new Cookies();

  useEffect(() => {
    const browserLang = navigator.language.toLocaleLowerCase();

    if (!cookies.get('NEXT_LOCALE')) {
      if (browserLang === 'ko' || browserLang.indexOf('ko-') !== -1) {
        setLanguage('ko');
      } else {
        setLanguage('en-US');
      }
    }
  }, []);

  useEffect(() => {
    cookies.set(COOKIE_NEXT_LOCALE, router.locale, {
      path: '/',
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    });
  }, [router.locale]);

  useEffect(() => {
    const defaultTimezone = LocalStorage.getItem(TIMEZONE);
    if (!defaultTimezone) {
      LocalStorage.setItem(TIMEZONE, timezones[0].value);
    }
  }, []);

  const [onMounted, setOnMounted] = useState<boolean>(false);
  useEffect(() => {
    setOnMounted(true);
  }, []);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 0,
          },
        },
      }),
  );

  useEffect(() => {
    window.history.scrollRestoration = 'auto';

    const cacheScrollPositions: Array<[number, number]> = [];
    let shouldScrollRestore: null | { x: number; y: number };
    let isPushLocation = true;

    router.events.on('routeChangeStart', () => {
      if (isPushLocation) {
        cacheScrollPositions.push([window.scrollX, window.scrollY]);
      }
    });

    router.events.on('routeChangeComplete', () => {
      isPushLocation = true;

      if (shouldScrollRestore) {
        const { x, y } = shouldScrollRestore;
        setTimeout(() => window.scrollTo(x, y), 10);
        shouldScrollRestore = null;
      }
      window.history.scrollRestoration = 'auto';
    });

    router.beforePopState(() => {
      if (cacheScrollPositions.length > 0) {
        const scrollPosition = cacheScrollPositions.pop();

        if (scrollPosition) {
          shouldScrollRestore = {
            x: scrollPosition[0],
            y: scrollPosition[1],
          };

          if (scrollPosition[0] === 0 && scrollPosition[1] === 0) {
            shouldScrollRestore = {
              x: 1,
              y: 1,
            };
          }
        }
      }
      window.history.scrollRestoration = 'manual';

      isPushLocation = false;

      return true;
    });
  }, []);

  return (
    <>
      <ResetStyles />
      <GlobalStyles />
      <SweetAlert2Styles />
      <NextNProgress
        color="#9880ff"
        startPosition={0.35}
        stopDelayMs={100}
        height={3}
        showOnShallow
        options={{ showSpinner: false }}
      />
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={(pageProps as any).dehydratedState}>{onMounted && <Component {...pageProps} />}</Hydrate>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
