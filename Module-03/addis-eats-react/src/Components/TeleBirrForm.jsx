// src/components/TeleBirrForm.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';

function TeleBirrForm({ orderTotal, onPlaceOrder }) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  // Ethiopian Phone Number Regex for validation
  const phoneRegex = /^(?:\+251|0)[97]\d{8}$/; // Supports 09/07 or +2519/+2517

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh

    setError(''); // Clear previous errors

    // Basic Form Validation (Day 27)
    if (!fullName.trim() || !phone.trim() || !address.trim()) {
      setError('All fields are required!');
      return;
    }

    if (!phoneRegex.test(phone.trim())) {
      setError('Please enter a valid TeleBirr Phone Number (e.g., 09... or 07...)');
      return;
    }

    // Pass valid data up to the parent component
    onPlaceOrder({ fullName: fullName.trim(), phone: phone.trim(), address: address.trim() });

    // Reset form after submission
    setFullName('');
    setPhone('');
    setAddress('');
  };

  return (
    <div className="delivery-section">
      <h2 className="delivery-title">TeleBirr Delivery Details</h2>
      <form onSubmit={handleSubmit} className="delivery-form">
        <input
          type="text"
          id="fullName"
          className="form-input"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input
          type="tel"
          id="phone"
          className="form-input"
          placeholder="TeleBirr Phone (09... or 07...)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          type="text"
          id="address"
          className="form-input"
          placeholder="Delivery Area / Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        {error && <p style={{ color: 'var(--spicy-red)', fontSize: '0.85rem', textAlign: 'center' }}>{error}</p>}
        <button type="submit" id="orderBtn" className="btn-order">
          Place Order ({orderTotal} ETB)
        </button>
      </form>
    </div>
  );
}

TeleBirrForm.propTypes = {
  orderTotal: PropTypes.number.isRequired,
  onPlaceOrder: PropTypes.func.isRequired,
};

export default TeleBirrForm;