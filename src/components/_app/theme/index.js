// References: https://www.58bits.com/blog/2020/05/27/material-ui-theme-switcher-react
import { useState, createContext } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { getTheme } from './themes';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const DEFAULT_THEME = 'default';

export const ThemeContext = createContext({
  currentTheme: DEFAULT_THEME,
  setTheme: null,
});

export default function CustomThemeProvider({ children }) {
  // Read current theme from somewhere (API/storage)
  const currentTheme = localStorage.getItem('theme') || DEFAULT_THEME;
  const [themeName, _setThemeName] = useState(currentTheme);
  const theme = getTheme(themeName);

  // Wrap _setThemeName to store theme names in storage
  const setThemeName = (newThemeName) => {
    localStorage.setItem('theme', newThemeName);
    _setThemeName(newThemeName);
  };

  const contextValue = {
    currentTheme: currentTheme,
    setTheme: setThemeName,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        {children}
        <ToastContainer
          theme={currentTheme !== DEFAULT_THEME ? 'dark' : 'light'}
          position='top-center'
          autoClose={3000}
          pauseOnHover={false}
          closeOnClick
          pauseOnFocusLoss={false}
          hideProgressBar
        />
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
