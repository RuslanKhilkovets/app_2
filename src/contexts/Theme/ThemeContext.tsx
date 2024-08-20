import {createContext, useContext, useState} from 'react';
const ThemeContext = createContext({
  colorScheme: 'light',
  setColorScheme: (value: 'string') => {},
});

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeContextProvider = ({children}: React.PropsWithChildren) => {
  const [colorScheme, setColorScheme] = useState('light');

  return (
    <ThemeContext.Provider
      value={{
        colorScheme,
        setColorScheme,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default {
  useThemeContext,
  ThemeContextProvider,
};
