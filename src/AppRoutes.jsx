import {
  Route,
  Routes,
} from 'react-router-dom';
import React from 'react';

import Cart from './Cart';
import Checkout from './Checkout';
import ProductDetails from './ProductDetails';
import Products from './Products';

const AppRoutes = ({
  cart,
  dispatch,
}) => (
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
      element={<ProductDetails dispatch={dispatch} />}
      path='/:category/:id'
    />
    <Route
      element={(
        <Cart
          cart={cart}
          dispatch={dispatch}
        />
      )}
      path='/cart'
    />
    <Route
      element={(
        <Checkout dispatch={dispatch} />
      )}
      path='/checkout'
    />
  </Routes>
);

export default AppRoutes;
