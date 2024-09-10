import React from 'react';
import {Provider} from 'react-redux';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import {Navigation} from '@/navigation';
import {ThemeProvider} from '@/contexts/Theme/ThemeContext';
import {AuthProvider} from '@/contexts/Auth/AuthContext';
import store from './src/store';

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
          </AuthProvider>
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
