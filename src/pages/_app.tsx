import '../styles/globals.scss';
import type {AppProps} from 'next/app';
import {wrapper} from '../redux/store';
import Head from 'next/head';
import React from 'react';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {CssVarsProvider, useTheme} from '@mui/joy/styles';
import { useColorScheme } from '@mui/joy/styles';
import Button from '@mui/joy/Button';

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  return (
      <Button
          variant="plain"
          color="neutral"
          sx={{
            position: 'absolute',
            right: '0px',
            top: '0px'
          }}
          onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
      >
        {mode === 'dark' ? <Brightness7Icon/> : <Brightness4Icon/>}
      </Button>
  );
}

function MyApp({Component, pageProps}: AppProps) {
  const theme = useTheme();

  return <div id="app">
      <CssVarsProvider theme={theme}>
        <Head>
          <title>Sora reader</title>
          <meta
              name="viewport"
              id="viewport"
              content="width=device-width, viewport-fit=cover, initial-scale=1"
          />
          <link rel="icon" href="/favicon.ico"/>
        </Head>
        {/* TODO: remove after normal theme switcher, or at least refactor */}
        {process.env.NODE_ENV === 'development' && <ModeToggle/>}
        <Component {...pageProps} />
      </CssVarsProvider>
  </div>;
}

export default wrapper.withRedux(MyApp);
