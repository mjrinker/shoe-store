import React from 'react';

import './App.css';
import Footer from './Footer';
import Header from './Header';

const App = () => {
/*
 * const renderProduct = (product) => (
 *   <div
 *     className='product'
 *     key={product.id}
 *   >
 *     <a href='/'>
 *       <img
 *         alt={product.name}
 *         src={`/images/${product.image}`}
 *       />
 *       <h3>{product.name}</h3>
 *       <p>${product.price}</p>
 *     </a>
 *   </div>
 * );
 */

  return (
    <>
      <div className='content'>
        <Header />
        <main>
          <section id='filters'>
            <label htmlFor='size'>Filter by Size:</label>{' '}
            <select id='size'>
              <option value=''>All sizes</option>
              <option value='7'>7</option>
              <option value='8'>8</option>
              <option value='9'>9</option>
            </select>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default App;
