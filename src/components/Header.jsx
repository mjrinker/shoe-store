import {
  Link,
  NavLink,
} from 'react-router-dom';
import React from 'react';

const activeStyle = {
  color: '#333',
  cursor: 'default',
};

const Header = () => (
  <header>
    <nav>
      <ul>
        <li>
          <Link to='/'>
            <img
              alt='Carved Rock Fitness'
              src='/images/logo.png'
            />
          </Link>
        </li>
        <li>
          <NavLink
            activeStyle={activeStyle}
            to='/shoes'
          >
            Shoes
          </NavLink>
        </li>
        <li>
          <NavLink
            activeStyle={activeStyle}
            to='/cart'
          >
            Cart
          </NavLink>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
