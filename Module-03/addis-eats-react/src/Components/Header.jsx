// src/components/Header.jsx
import React from 'react';
import PropTypes from 'prop-types';
function Header({ orderTotal }) {
  return (
    <>
      <h1>Addis Eats Menu</h1>
      <div className="total-badge">Order Total: {orderTotal} ETB</div>
    </>
  );
}

Header.propTypes = {
  orderTotal: PropTypes.number.isRequired,
};

export default Header;
