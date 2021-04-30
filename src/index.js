import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import { CartProvider } from './contexts/cartContext';
import ErrorBoundary from './components/ErrorBoundary';

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
