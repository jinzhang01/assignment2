import React, { createContext, useContext, useState } from 'react';
import { colors } from '../style/colors';

const lightThemeColors = {
  background: colors.Background,
  text: colors.BlackText,
  button: "lightgreen",
};

const darkThemeColors = {
  background: colors.Darkmode,
  text: colors.WhiteText,
  button: "red",
};

// Create a context with a default value
const ThemeContext = createContext({
  theme: lightThemeColors,
  toggleTheme: () => {},
});

// Provide Theme Context to the component tree
export const ThemeProvider = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(false);

  // Toggle function
  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const theme = darkTheme ? darkThemeColors : lightThemeColors;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);