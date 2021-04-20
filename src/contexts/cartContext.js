import React, {
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';

import cartReducer from '../reducers/cartReducer';

let initialCart;
try {
  initialCart = JSON.parse(localStorage.getItem('cart')) ?? [];
} catch {
  initialCart = [];
}

const CartContext = React.createContext(null);

const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  useEffect(() => localStorage.setItem('cart', JSON.stringify(cart)), [cart]);

  const contextValue = useMemo(() => ({
    cart,
    dispatch,
  }), [cart, dispatch]);

  return (
    <CartContext.Provider
      value={contextValue}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    const error = new Error('useCart must be used within a CartProvider. Wrap a parent component in <CartProvider /> to fix this error.');
    error.name = 'ContextNotFoundError';
    throw error;
  }

  return context;
};

export {
  CartProvider,
  useCart,
};
