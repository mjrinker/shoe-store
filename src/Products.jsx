import {
  Link,
  useParams,
} from 'react-router-dom';
import React, { useState } from 'react';

import PageNotFound from './PageNotFound';
import Spinner from './Spinner';
import useFetch from './services/useFetch';

const Products = () => {
  const [size, setSize] = useState('');
  const { category } = useParams();

  const {
    data: products,
    error,
    loading,
  } = useFetch(`/products?category=${category}`);

  const filteredProducts = size
    ? products.filter((product) => product.skus.find((sku) => `${sku.size}` === size))
    : products;

  if (error && error?.name !== 'NotFoundError') {
    throw error;
  }

  if (loading) {
    return <Spinner />;
  }

  if (products.length === 0) {
    return <PageNotFound />;
  }

  return (
    <>
      <section id='filters'>
        <label htmlFor='size'>Filter by Size:</label>{' '}
        <select
          id='size'
          onChange={(event) => setSize(event.target.value)}
          value={size}
        >
          <option value=''>All sizes</option>
          <option value='7'>7</option>
          <option value='8'>8</option>
          <option value='9'>9</option>
        </select>
        <h4>
          Showing {filteredProducts.length} of {products.length} products.
        </h4>
      </section>
      <section id='products'>
        {filteredProducts.map((product) => (
          <div
            className='product'
            key={product.id}
          >
            <Link to={`/${category}/${product.id}`}>
              <img
                alt={product.name}
                src={`/images/${product.image}`}
              />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
            </Link>
          </div>
        ))}
      </section>
    </>
  );
};

export default Products;
