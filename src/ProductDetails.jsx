import React from 'react';
import {
  useNavigate,
  useParams,
} from 'react-router-dom';

import PageNotFound from './PageNotFound';
import Spinner from './Spinner';
import useFetch from './services/useFetch';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
      <p>
        <button
          className='btn btn-primary'
          onClick={() => navigate('/cart')}
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
