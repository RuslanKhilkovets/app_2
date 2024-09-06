import React, {createContext, useContext, useState, useEffect} from 'react';
import {useColorScheme} from 'react-native';
import {themes} from '@/contexts';

interface ThemeContextProps {
  colorScheme: 'light' | 'dark';
  setColorScheme: (value: 'light' | 'dark') => void;
  themes: any;
}

const ThemeContext = createContext<ThemeContextProps>({
  colorScheme: 'light',
  setColorScheme: () => {},
  themes,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({children}: React.PropsWithChildren) => {
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
        themes,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default {
  useTheme,
  ThemeProvider,
};
