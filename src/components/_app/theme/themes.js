import { createTheme } from '@mui/material/styles';
import { darkScrollbar } from '@mui/material';

export const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#0093a8',
    },
    secondary: {
      main: '#2e7d32',
    },
    defaultColor: {
      main: '#000000',
    },
    background: {
      default: '#e5e5e5',
      paper: '#f5f5f5',
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0093a8',
    },
    secondary: {
      main: '#2e7d32',
    },
    defaultColor: {
      main: '#f1f1f1',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: darkScrollbar(),
      },
    },
  },
});

export const Themes = {
  default: defaultTheme,
  dark: darkTheme,
};

export function getTheme(theme) {
  return Themes[theme];
}

export default getTheme;
