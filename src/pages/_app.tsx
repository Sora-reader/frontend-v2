import '../styles/globals.scss';
import type {AppProps} from 'next/app';
import {wrapper} from '../redux/store';
import React from 'react';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {CssVarsProvider, useColorScheme} from '@mui/joy/styles';
import Button from '@mui/joy/Button';
import {themeBase} from '../common/theme';
import Head from 'next/head';
import {useMounted} from '../common/hooks';
import {MainLayout} from '../components/layout/MainLayout';

function ModeToggle() {
  const {mode, setMode} = useColorScheme();
  return (
    <Button
      variant="plain"
      color="neutral"
      sx={{
        position: 'absolute',
        right: '0px',
        top: '0px',
      }}
      onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
    >
      {mode === 'dark' ? <Brightness7Icon/> : <Brightness4Icon/>}
    </Button>
  );
}

function MyApp({Component, pageProps}: AppProps) {
  const theme = themeBase;
  const mounted = useMounted();

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
        {mounted && <ModeToggle/>}
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </CssVarsProvider>
    </div>
  );
}

export default wrapper.withRedux(MyApp);
