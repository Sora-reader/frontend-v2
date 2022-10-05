import { Html, Main, NextScript } from 'next/document';
import { getInitColorSchemeScript } from '@mui/joy';
import { AppHead } from '../components/override/AppHead';

export default function Document() {
  return (
    <Html>
      <AppHead>
        <meta name="referrer" content="no-referrer" />
        <link rel="icon" href="/favicon.ico" />
      </AppHead>
      <body>
        {getInitColorSchemeScript()}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
