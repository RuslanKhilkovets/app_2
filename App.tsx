import React from 'react';
import {Provider} from 'react-redux';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

import {Navigation} from '@/navigation';
import {ThemeProvider} from '@/contexts/Theme/ThemeContext';
import {AuthProvider} from '@/contexts/Auth/AuthContext';
import store from './src/store';

GoogleSignin.configure({
  iosClientId:
    '1005466156456-iq8n5e8iudb8qoju2cdsv77bepjia7lr.apps.googleusercontent.com',
  webClientId:
    '1005466156456-gq1fj521qisjcl161pj673kfle3l1thg.apps.googleusercontent.com',
  offlineAccess: true,
});

if (__DEV__) {
  require('./ReactotronConfig');
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 1,
      cacheTime: 1000 * 60 * 1,
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
      retry: false,
      select: ({data: {data}}) => data,
    },
    mutations: {
      cacheTime: 1000 * 60 * 1,
      retry: false,
    },
  },
});

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider>
          <AuthProvider>
            <Navigation />
            <Toast />
          </AuthProvider>
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
