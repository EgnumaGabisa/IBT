// src/components/CategoryFilter.jsx
import React from 'react';
import PropTypes from 'prop-types';

function CategoryFilter({ categories, activeCategory, onSelectCategory }) {
  return (
    <div className="categories-container">
      {categories.map((category) => (
        <button
          key={category} // Stable keys for list rendering (Day 27)
          className={`category-btn ${activeCategory === category ? 'active' : ''}`}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeCategory: PropTypes.string.isRequired,
  onSelectCategory: PropTypes.func.isRequired,
};

export default CategoryFilter;
