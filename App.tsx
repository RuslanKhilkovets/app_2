import React from 'react';
import {Provider} from 'react-redux';

import {Navigation} from '@/navigation';
import {ThemeProvider} from '@/contexts/Theme/ThemeContext';
import {AuthProvider} from '@/contexts/Auth/AuthContext';
import {store} from '@/store';

if (__DEV__) {
  require('./ReactotronConfig');
}

function App(): React.JSX.Element {
  console.log(AuthProvider);

  return (
    <ThemeProvider>
      <AuthProvider>
        <Provider store={store}>
          <Navigation />
        </Provider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
