import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';

import { getAll } from '../hooks/useFetchAll';
import { useCart } from '../contexts/cartContext';

import Spinner from './Spinner';

const Cart = () => {
  const {
    cart,
    dispatch,
  } = useCart();
  const navigate = useNavigate();
  const routes = cart.map((item) => `/products/${item.id}`);
  const {
    data: products,
    error,
    isLoading,
  } = useQuery(['products', routes], getAll);

  const renderItem = (itemInCart) => {
    const {
      id,
      quantity,
      sku,
    } = itemInCart;
    const {
      name,
      image,
      price,
      skus,
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
            {/* eslint-disable-next-line jsx-a11y/no-onchange */}
            <select
              aria-label={`Select quantity for ${name} size ${size}`}
              value={quantity}
              onChange={(event) => dispatch({
                quantity: Number.parseInt(event.target.value, 10),
                sku,
                type: 'update',
              })}
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

  if (isLoading) {
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
          type='submit'
          onClick={() => navigate('/checkout')}
        >
          Continue to checkout
        </button>
      )}
    </section>
  );
};

export default Cart;
