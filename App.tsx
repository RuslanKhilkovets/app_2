import React from 'react';

import {Navigation} from '@/navigation';
import {ThemeContextProvider} from '@/contexts/Theme/ThemeContext';

if (__DEV__) {
  require('./ReactotronConfig');
}

function App(): React.JSX.Element {
  return (
    <ThemeContextProvider>
      <Navigation />
    </ThemeContextProvider>
  );
}

export default App;
