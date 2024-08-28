import React from 'react';

import {Navigation} from '@/navigation';
import {ThemeContextProvider} from '@/contexts/Theme/ThemeContext';
import {SafeAreaView} from 'react-native';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ThemeContextProvider>
        <Navigation />
      </ThemeContextProvider>
    </SafeAreaView>
  );
}

export default App;
