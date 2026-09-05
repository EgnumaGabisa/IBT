// src/App.jsx
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Dish from './components/Dish';
import CategoryFilter from './components/CategoryFilter';
import TeleBirrForm from './components/TeleBirrForm';
import allDishes from './data/menuData';

function App() {
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [orderTotal, setOrderTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Categories for filter
  const categories = ['All', 'Mains', 'Vegan', 'Drinks', 'Desserts'];

  // Initial load
  useEffect(() => {
    setMenuItems(allDishes);
  }, []);

  // Filtering logic
  useEffect(() => {
    let currentFiltered = menuItems;

    if (selectedCategory !== 'All') {
      currentFiltered = currentFiltered.filter(dish => dish.category === selectedCategory);
    }

    if (searchQuery) {
      currentFiltered = currentFiltered.filter(dish =>
        dish.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredItems(currentFiltered);
  }, [menuItems, selectedCategory, searchQuery]);

  const handleAddDish = (price) => {
    setOrderTotal(prevTotal => prevTotal + price);
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePlaceOrder = (deliveryDetails) => {
    if (orderTotal === 0) {
      alert("Please add at least one dish to your order first!");
      return;
    }
    alert(`🎉 Success! Thank you ${deliveryDetails.fullName}.\nYour TeleBirr Order of ${orderTotal} ETB has been placed successfully!\nDelivery Address: ${deliveryDetails.address}`);
    setOrderTotal(0);
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
      <Header orderTotal={orderTotal} />

      <div className="search-container">
        <input
          type="text"
          id="searchInput"
          className="search-input"
          placeholder="Search dishes..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <CategoryFilter
        categories={categories}
        activeCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />

      <div className="menu-grid">
        {filteredItems.length > 0 ? (
          filteredItems.map((dish) => (
            <Dish key={dish.id} dish={dish} onAdd={handleAddDish} />
          ))
        ) : (
          <p style={{ gridColumn: '1/-1', textAlign: 'center', color: 'var(--text-muted)', padding: '20px' }}>
            No dishes found for the current selection.
          </p>
        )}
      </div>

      <TeleBirrForm orderTotal={orderTotal} onPlaceOrder={handlePlaceOrder} />
    </div>
  );
}

export default App;
