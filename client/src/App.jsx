import React from 'react';
import Rekn from './Rekn';
import AppContainer from './AppContainer';

import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContainer>
        <Rekn/>
      </AppContainer>
    </QueryClientProvider>
  );
}

export default App;