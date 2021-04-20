import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { CartProvider } from './contexts/cartContext';
import ErrorBoundary from './ErrorBoundary';

ReactDOM.render(
  (
    <ErrorBoundary>
      <BrowserRouter>
        <CartProvider>
          <App />
        </CartProvider>
      </BrowserRouter>
    </ErrorBoundary>
  ),
  document.querySelector('#root'),
);
