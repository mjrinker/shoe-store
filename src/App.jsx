import {
  Route,
  Routes,
} from 'react-router-dom';
import React from 'react';

import './App.css';
import Cart from './Cart';
import Footer from './Footer';
import Header from './Header';
import ProductDetails from './ProductDetails';
import Products from './Products';

const App = () => (
  <>
    <div className='content'>
      <Header />
      <main>
        <Routes>
          <Route
            element={<h1>Welcome to Carved Rock Fitness!</h1>}
            path='/'
          />
          <Route
            element={<Products />}
            path='/:category'
          />
          <Route
            element={<ProductDetails />}
            path='/:category/:id'
          />
          <Route
            element={<Cart />}
            path='/cart'
          />
        </Routes>
      </main>
    </div>
    <Footer />
  </>
);

export default App;
