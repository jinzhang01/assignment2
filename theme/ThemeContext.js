import React, { createContext, useContext, useState } from 'react';

// Create a context with a default value
const ThemeContext = createContext({
  darkTheme: false,
  toggleTheme: () => {},
});

// Provide Theme Context to the component tree
export const ThemeProvider = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(false);

  // Toggle function
  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  return (
    <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);