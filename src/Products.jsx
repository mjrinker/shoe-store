import {
  Link,
  useParams,
} from 'react-router-dom';
import React, { useState } from 'react';
import { useQuery } from 'react-query';

import { get } from './hooks/useFetch';
import PageNotFound from './PageNotFound';
import Spinner from './Spinner';

const Products = () => {
  const [size, setSize] = useState('');
  const { category } = useParams();

  const {
    data: products,
    error,
    isLoading,
  } = useQuery(['products', `/products?category=${category}`], get);

  console.info('products', products);

  const filteredProducts = size
    ? products.filter((product) => product.skus.find((sku) => `${sku.size}` === size))
    : products;

  if (error && error?.name !== 'NotFoundError') {
    throw error;
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (products.length === 0) {
    return <PageNotFound />;
  }

  return (
    <>
      <section id='filters'>
        <label htmlFor='size'>Filter by Size:</label>{' '}
        {/* eslint-disable-next-line jsx-a11y/no-onchange */}
        <select
          id='size'
          value={size}
          onChange={(event) => setSize(event.target.value)}
        >
          <option value=''>All sizes</option>
          {[
            ...new Set(
              products.flatMap((product) => product.skus.map(({ size }) => size)),
            ),
          ].map((size) => (
            <option
              key={size}
              value={size}
            >
              {size}
            </option>
          ))}
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
