import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import React from 'react';

import '../styles/App.css';
import AppRoutes from './AppRoutes';
import Footer from './Footer';
import Header from './Header';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <div className='content'>
      <Header />
      <main>
        <AppRoutes />
      </main>
    </div>
    <Footer />
  </QueryClientProvider>
);

export default App;
