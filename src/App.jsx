import React, {
  useEffect,
  useState,
} from 'react';
import {
  Route,
  Routes,
} from 'react-router-dom';

import './App.css';
import Cart from './Cart';
import Checkout from './Checkout';
import Footer from './Footer';
import Header from './Header';
import ProductDetails from './ProductDetails';
import Products from './Products';

const App = () => {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cart')) ?? [];
    } catch {
      return [];
    }
  });

  useEffect(() => localStorage.setItem('cart', JSON.stringify(cart)), [cart]);

  const getItemsWithUpdatedQuantity = (items, sku, quantity, increment = false) => {
    if (quantity === 0) {
      return items.filter((item) => item.sku !== sku);
    }

    return items.map((item) => {
      if (item.sku === sku) {
        return {
          ...item,
          quantity: increment ? item.quantity + quantity : quantity,
        };
      }

      return item;
    });
  };

  const addToCart = (id, sku) => {
    setCart((items) => {
      const itemInCart = items.find((item) => item.sku === sku);
      if (itemInCart) {
        return getItemsWithUpdatedQuantity(items, sku, 1, true);
      }

      return [
        ...items,
        {
          id,
          quantity: 1,
          sku,
        },
      ];
    });
  };

  const emptyCart = () => {
    setCart([]);
  };

  const updateQuantity = (sku, quantity) => {
    setCart((items) => getItemsWithUpdatedQuantity(items, sku, quantity));
  };

  return (
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
              element={<ProductDetails addToCart={addToCart} />}
              path='/:category/:id'
            />
            <Route
              element={(
                <Cart
                  cart={cart}
                  updateQuantity={updateQuantity}
                />
              )}
              path='/cart'
            />
            <Route
              element={(
                <Checkout emptyCart={emptyCart} />
              )}
              path='/checkout'
            />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default App;
