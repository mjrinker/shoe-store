import React, { useState } from 'react';

import './App.css';
import Footer from './Footer';
import Header from './Header';
import Spinner from './Spinner';
import useFetch from './services/useFetch';

const category = 'shoes';

const App = () => {
  const [size, setSize] = useState('');

  const {
    data: products,
    error,
    loading,
  } = useFetch(`/products?category=${category}`);

  const filteredProducts = size
    ? products.filter((product) => product.skus.find((sku) => `${sku.size}` === size))
    : products;

  if (error) {
    throw error;
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div className='content'>
        <Header />
        <main>
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
                <a href='/'>
                  <img
                    alt={product.name}
                    src={`/images/${product.image}`}
                  />
                  <h3>{product.name}</h3>
                  <p>${product.price}</p>
                </a>
              </div>
            ))}
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default App;
