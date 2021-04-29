import React, { useState } from 'react';
import {
  useNavigate,
  useParams,
} from 'react-router-dom';

import PageNotFound from './PageNotFound';
import Spinner from './Spinner';
import { useCart } from './contexts/cartContext';
import useFetch from './hooks/useFetch';

const ProductDetails = () => {
  const { dispatch } = useCart();
  const navigate = useNavigate();
  const { id } = useParams();
  const [sku, setSKU] = useState('');

  const {
    data: product,
    error,
    loading,
  } = useFetch(`/products/${id}`);

  if (loading) {
    return <Spinner />;
  }

  if (error && error?.name !== 'NotFoundError') {
    throw error;
  }

  if (!product) {
    return <PageNotFound />;
  }

  return (
    <div id='detail'>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p id='price'>${product.price}</p>
      {/* eslint-disable-next-line jsx-a11y/no-onchange */}
      <select
        aria-label='Select size'
        id='sku'
        onChange={(event) => setSKU(event.target.value)}
        value={sku}
      >
        <option value=''>What size?</option>
        {product.skus.map(({
          size,
          sku,
        }) => (
          <option
            key={sku}
            value={sku}
          >
            {size}
          </option>
        ))}
      </select>
      <p>
        <button
          className='btn btn-primary'
          disabled={!sku}
          onClick={() => {
            dispatch({
              id,
              sku,
              type: 'add',
            });
            navigate('/cart');
          }}
          type='button'
        >
          Add to Cart
        </button>
      </p>
      <img
        alt={product.category}
        src={`/images/${product.image}`}
      />
    </div>
  );
};

export default ProductDetails;
