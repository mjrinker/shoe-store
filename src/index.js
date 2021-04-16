import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import ErrorBoundary from './ErrorBoundary';

ReactDOM.render(
  (
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  ),
  document.querySelector('#root'),
);
