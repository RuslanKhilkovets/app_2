import React, {createContext, useContext, useState, useEffect} from 'react';
import {useColorScheme} from 'react-native';

interface ThemeContextProps {
  colorScheme: 'light' | 'dark';
  setColorScheme: (value: 'light' | 'dark') => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  colorScheme: 'light',
  setColorScheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeContextProvider = ({children}: React.PropsWithChildren) => {
  const deviceColorScheme = useColorScheme();

  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>(
    deviceColorScheme || 'light',
  );

  useEffect(() => {
    setColorScheme(deviceColorScheme || 'light');
  }, [deviceColorScheme]);

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
  useTheme,
  ThemeContextProvider,
};
