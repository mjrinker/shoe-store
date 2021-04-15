import React, {
  useEffect,
  useState,
} from 'react';

import './App.css';
import Footer from './Footer';
import { getProducts } from './services/productService';
import Header from './Header';

const App = () => {
  const [products, setProducts] = useState([]);
  const [size, setSize] = useState('');

  useEffect(() => {
    getProducts('shoes').then((response) => setProducts(response));
  }, []);

  const filteredProducts = size
    ? products.filter((product) => product.skus.find((sku) => `${sku.size}` === size))
    : products;

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
            {<h4>Showing {filteredProducts.length} of {products.length} products.</h4>}
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
