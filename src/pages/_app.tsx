import '../core/styles/globals.scss';
import '../core/routing';
import type { AppProps } from 'next/app';
import { wrapper } from '../core/store';
import React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Head from 'next/head';
import { useMounted } from '../misc/hooks';
import { MainLayout } from '../components/layout/MainLayout';
import { themeBase } from '../core/styles/theme';
import { ThemeSwitcher } from '../misc/components/ThemeSwitcher';
import { useIsReaderRoute } from '../core/routing';
import NextNProgress from 'nextjs-progressbar';

// Source links in detail
// Titles
// - /search - Поиск
// - /detail - {manga.title}
// - /read - [{chapter}-{vol}] {manga.title}
// - /signIn - Вход
// OpenGraph

// Mode pager types, allow changing on-demand (per-manga, saved in localstorage with other user preferences)

// TODO: New CSS tokens for logo path
// TODO: Better styling for route progress bar

// TODO: Add lists
// TODO: chapter image selector on navbar

// TODO: Track read chapters & sync with backend (redux-persist)
//    Possibly required sync system slice aggregator
// TODO: Next chapter link at the end of the chapter

// TODO: Error pages: 404, 500, etc...
// TODO: PWA setup
// TODO: Download chapters locally
// TODO: Settings (show cache size, purge cache button)

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
          <NextNProgress
            color="var(--joy-palette-primary-main)"
            showOnShallow={false}
            options={{ showSpinner: false }}
          />
          <Component {...pageProps} />
        </MainLayout>
      </CssVarsProvider>
    </div>
  );
}

export default wrapper.withRedux(MyApp);
