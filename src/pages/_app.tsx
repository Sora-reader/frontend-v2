import '../core/styles/globals.scss';
import '../core/routing';
import type { AppProps } from 'next/app';
import { wrapper } from '../core/store';
import React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Head from 'next/head';
import { MainLayout } from '../components/layout/MainLayout';
import { themeBase } from '../core/styles/theme';
import NextNProgress from 'nextjs-progressbar';

// Source links in detail
// Titles
// - /search - Поиск
// - /detail - {manga.title}
// - /read - [{chapter}-{vol}] {manga.title}
// - /signIn - Вход
// OpenGraph

// More pager types, allow changing on-demand (per-manga, saved in localstorage with other user preferences)

// Disable swipe when pinched ???

// TODO: New CSS tokens for logo path
// TODO: Better styling for route progress bar

// TODO: chapter image selector on navbar

// TODO: Track read chapters & sync with backend (redux-persist)
//    Possibly required sync system slice aggregator
// TODO: Next chapter link at the end of the chapter

// TODO: Error pages: 404, 500, etc...
// TODO: PWA setup
// TODO: Download chapters locally
// TODO: Settings (show cache size, purge cache button)

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div id="app">
      <CssVarsProvider theme={themeBase}>
        <Head>
          <title>Sora reader</title>
          <meta
            name="viewport"
            id="viewport"
            content="width=device-width, viewport-fit=cover, initial-scale=1"
          />
        </Head>
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
