import React from 'react';

import {Navigation} from '@/screens';
import {ThemeContextProvider} from '@/contexts/Theme/ThemeContext';

function App(): React.JSX.Element {
  return (
    <ThemeContextProvider>
      <Navigation />
    </ThemeContextProvider>
  );
}

export default App;
