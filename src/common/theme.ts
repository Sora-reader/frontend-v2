import {CssVarsThemeOptions} from '@mui/joy';
import {extendTheme as extendJoyTheme} from '@mui/joy/styles';

export const themeBase: CssVarsThemeOptions = extendJoyTheme({
  fontFamily: {
    body: [
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
      'sans-serif',
    ].join(','),
  },
});
