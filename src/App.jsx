import React from 'react';

import './App.css';
import AppRoutes from './AppRoutes';
import Footer from './Footer';
import Header from './Header';

const App = () => (
  <>
    <div className='content'>
      <Header />
      <main>
        <AppRoutes />
      </main>
    </div>
    <Footer />
  </>
);

export default App;
