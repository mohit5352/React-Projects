import React from 'react';
import './Snackbar.css'

const Snackbar = ({ message, onClose }) => {
  return (
    <div className="snackbar-container">
      <span>{message}</span>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default Snackbar;