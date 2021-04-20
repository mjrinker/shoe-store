import React from 'react';
import { useNavigate } from 'react-router-dom';

import Spinner from './Spinner';
import useFetchAll from './hooks/useFetchAll';

const Cart = ({
  cart,
  dispatch,
}) => {
  const navigate = useNavigate();
  const routes = cart.map((index) => `/products/${index.id}`);
  const {
    data: products, loading, error,
  } = useFetchAll(routes);

  const renderItem = (itemInCart) => {
    const {
      id, sku, quantity,
    } = itemInCart;
    const {
      price, name, image, skus,
    } = products.find((product) => `${product.id}` === id);
    const { size } = skus.find((itemSKU) => itemSKU.sku === sku);

    return (
      <li
        className='cart-item'
        key={sku}
      >
        <img
          alt={name}
          src={`/images/${image}`}
        />
        <div>
          <h3>{name}</h3>
          <p>${price}</p>
          <p>Size: {size}</p>
          <p>
            <select
              aria-label={`Select quantity for ${name} size ${size}`}
              onChange={(event) => dispatch({
                quantity: Number.parseInt(event.target.value, 10),
                sku,
                type: 'update',
              })}
              value={quantity}
            >
              <option value='0'>Remove</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select>
          </p>
        </div>
      </li>
    );
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    throw error;
  }

  const numItemsInCart = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <section id='cart'>
      <h1>Cart</h1>
      <h3>{numItemsInCart > 0 ? `${numItemsInCart} item${numItemsInCart === 1 ? '' : 's'} in cart` : 'Your cart is empty'} </h3>
      <ul>{cart.map(renderItem)}</ul>
      {cart.length > 0 && (
        <button
          className='btn btn-primary'
          onClick={() => navigate('/checkout')}
          type='submit'
        >
          Continue to checkout
        </button>
      )}
    </section>
  );
};

export default Cart;
