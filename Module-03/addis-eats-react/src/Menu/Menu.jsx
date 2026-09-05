
import React, { useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import Dish from '../Dish/Dish';
import './Menu.css';

const Menu = () => {
  // Local JSON data ykn API endpoint fayyadamuu dandeessa
  const { data: dishes, loading, error } = useFetch('/data.json');
  const [selectedCategory, setSelectedCategory] = useState('All');

  if (loading) return <h3>Menu fe'amaa jira...</h3>;
  if (error) return <h3>Dogoggora: {error}</h3>;

  const categories = ['All', ...new Set(dishes?.map(d => d.category))];

  const filteredDishes = selectedCategory === 'All'
    ? dishes
    : dishes.filter(d => d.category === selectedCategory);

  return (
    <div className="menu-section">
      <h2>Our Menu</h2>
      
      {/* Category Filter Buttons */}
      <div className="filter-buttons">
        {categories.map((cat) => (
          <button
            key={cat}
            className={selectedCategory === cat ? 'active' : ''}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Dish List */}
      <div className="dish-grid">
        {filteredDishes?.map((dish) => (
          <Dish key={dish.id} dish={dish} />
        ))}
      </div>
    </div>
  );
};

export default Menu;