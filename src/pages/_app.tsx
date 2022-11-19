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
import { CssBaseline } from '@mui/joy';

// Source links in detail
// Titles
// - /search - Поиск
// - /detail - {manga.title}
// - /read - [{chapter}-{vol}] {manga.title}
// - /signIn - Вход
// OpenGraph

// TODO: Cleanup
//  How to use -moz-available cross-platform

// TODO: chapter image selector on navbar
// TODO: Next chapter link at the end of the chapter

// Disable swipe when pinched ???
// More pager types, allow changing on-demand (per-manga, saved in localstorage with other user preferences)
// TODO: Error pages: 404, 500, etc...
// TODO: PWA setup
// TODO: Download chapters locally
// TODO: Settings (show cache size, purge cache button)

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div id="app">
      <NextNProgress
        color="var(--joy-palette-primary-light)"
        showOnShallow={false}
        options={{ showSpinner: false }}
      />
      <CssVarsProvider theme={themeBase}>
        <CssBaseline />
        <Head>
          <title>Sora reader</title>
          <meta
            name="viewport"
            id="viewport"
            content="width=device-width, viewport-fit=cover, initial-scale=1"
          />
        </Head>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </CssVarsProvider>
    </div>
  );
}

export default wrapper.withRedux(MyApp);
