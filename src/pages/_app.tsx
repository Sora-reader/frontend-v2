import '../styles/globals.css';
import type {AppProps} from 'next/app';
import {wrapper} from '../redux/store';
import {createTheme, IconButton, ThemeProvider} from '@mui/material';
import Head from 'next/head';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

function MyApp({Component, pageProps}: AppProps) {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');

  const theme = React.useMemo(
      () => {
        return createTheme({
          palette: {
            // @ts-ignore
            mode,
          },
        });
      },
      [mode],
  );

  return <ThemeProvider theme={theme}>
    <CssBaseline/>
    <Head>
      <title>Sora reader</title>
      <meta
          name="viewport"
          id="viewport"
          content="width=device-width, viewport-fit=cover, initial-scale=1"
      />
      <link rel="icon" href="/public/favicon.ico"/>
    </Head>
    {/* TODO: remove after normal theme switcher, or at least refactor */}
    {process.env.NODE_ENV === 'development' &&
        <IconButton style={{position: 'absolute', right: '1px'}} sx={{ml: 1}}
                    onClick={() => setMode(mode === 'light' ? 'dark' : 'light')} color="inherit">
          {theme.palette.mode === 'dark' ? <Brightness7Icon/> : <Brightness4Icon/>}
        </IconButton>}
    <Component {...pageProps} />
  </ThemeProvider>;

}

export default wrapper.withRedux(MyApp);
