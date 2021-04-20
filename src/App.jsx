import React, {
  useEffect,
  useReducer,
} from 'react';

import './App.css';
import AppRoutes from './AppRoutes';
import cartReducer from './reducers/cartReducer';
import Footer from './Footer';
import Header from './Header';

let initialCart;
try {
  initialCart = JSON.parse(localStorage.getItem('cart')) ?? [];
} catch {
  initialCart = [];
}

const App = () => {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  useEffect(() => localStorage.setItem('cart', JSON.stringify(cart)), [cart]);

  return (
    <>
      <div className='content'>
        <Header />
        <main>
          <AppRoutes
            cart={cart}
            dispatch={dispatch}
          />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default App;
