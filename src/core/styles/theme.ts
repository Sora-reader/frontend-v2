import { CssVarsThemeOptions } from '@mui/joy';
import { deepmerge } from '@mui/utils';
import { experimental_extendTheme as extendMuiTheme } from '@mui/material/styles';
import colors from '@mui/joy/colors';
import { extendTheme as extendJoyTheme } from '@mui/joy/styles';

declare module '@mui/joy/styles' {
  interface Palette {
    logoSrc: string;
  }
}

const joyTheme: CssVarsThemeOptions = extendJoyTheme({
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
  components: {
    JoyTabs: {
      styleOverrides: {
        root: {
          margin: '1rem 0',
          // TODO: Remove when upgrade and everything is fixed
          backgroundColor: 'transparent',
        },
      },
    },
  },
  colorSchemes: {
    light: {
      palette: {
        logoSrc: '/logo.svg',
      },
    },
    dark: {
      palette: {
        logoSrc: '/logo-white.svg',
      },
    },
  },
});

const muiTheme = extendMuiTheme({
  // This is required to point to `var(--joy-*)` because we are using `CssVarsProvider` from Joy UI.
  cssVarPrefix: 'joy',
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: colors.blue[500],
        },
        grey: colors.grey,
        error: {
          main: colors.red[500],
        },
        info: {
          main: colors.purple[500],
        },
        success: {
          main: colors.green[500],
        },
        warning: {
          main: colors.yellow[200],
        },
        common: {
          white: '#FFF',
          black: '#09090D',
        },
        divider: colors.grey[200],
        text: {
          primary: colors.grey[800],
          secondary: colors.grey[600],
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: colors.blue[600],
        },
        grey: colors.grey,
        error: {
          main: colors.red[600],
        },
        info: {
          main: colors.purple[600],
        },
        success: {
          main: colors.green[600],
        },
        warning: {
          main: colors.yellow[300],
        },
        common: {
          white: '#FFF',
          black: '#09090D',
        },
        divider: colors.grey[800],
        text: {
          primary: colors.grey[100],
          secondary: colors.grey[300],
        },
      },
    },
  },
});

// You can use your own `deepmerge` function.
// joyTheme will deeply merge to muiTheme.
export const themeBase = deepmerge(muiTheme, joyTheme);
