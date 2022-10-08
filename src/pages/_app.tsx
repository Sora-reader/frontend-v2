import '../core/styles/globals.scss';
import '../core/routing';
import type { AppProps } from 'next/app';
import { wrapper } from '../core/store';
import React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Head from 'next/head';
import { useMounted } from '../common/hooks';
import { MainLayout } from '../components/layout/MainLayout';
import { themeBase } from '../core/styles/theme';
import { ThemeSwitcher } from '../common/components/ThemeSwitcher';
import { useIsReaderRoute } from '../core/routing';

function MyApp({ Component, pageProps }: AppProps) {
  const theme = themeBase;
  const mounted = useMounted();
  const isReaderRoute = useIsReaderRoute();

  return (
    <div id="app">
      <CssVarsProvider theme={theme}>
        <Head>
          <title>Sora reader</title>
          <meta
            name="viewport"
            id="viewport"
            content="width=device-width, viewport-fit=cover, initial-scale=1"
          />
        </Head>
        {mounted && !isReaderRoute && <ThemeSwitcher />}
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </CssVarsProvider>
    </div>
  );
}

export default wrapper.withRedux(MyApp);
