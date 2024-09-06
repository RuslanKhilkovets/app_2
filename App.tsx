import React from 'react';
import {Provider} from 'react-redux';

import {Navigation} from '@/navigation';
import {ThemeContextProvider} from '@/contexts/Theme/ThemeContext';
import {store} from '@/store';

if (__DEV__) {
  require('./ReactotronConfig');
}

function App(): React.JSX.Element {
  return (
    <ThemeContextProvider>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </ThemeContextProvider>
  );
}

export default App;
