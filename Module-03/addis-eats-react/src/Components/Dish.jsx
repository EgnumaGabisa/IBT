// src/components/Dish.jsx
import React from 'react';
import PropTypes from 'prop-types';

function Dish({ dish, onAdd }) {
  // Destructuring for cleaner access
  const { name, price, category, spicy, img } = dish;

  return (
    <div className="food-card">
      <img src={img} alt={name} className="food-img" />
      <div className="card-details">
        <div className="title-row">
          <span className="food-title">{name}</span>
          {/* Conditionally rendered spicy badge */}
          {spicy && <span className="spicy-badge">🌶️ Spicy</span>}
        </div>
        <div className="food-price">{price} ETB</div>
      </div>
      <button className="btn-add" onClick={() => onAdd(price)}>Add</button>
    </div>
  );
}

// PropTypes for validation (Day 27)
Dish.propTypes = {
  dish: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    spicy: PropTypes.bool, // Default will handle if not provided
    img: PropTypes.string.isRequired,
  }).isRequired,
  onAdd: PropTypes.func.isRequired,
};

// Default props (Day 27)
Dish.defaultProps = {
  spicy: false, // Dishes are not spicy by default if 'spicy' prop is missing
};

export default Dish;
