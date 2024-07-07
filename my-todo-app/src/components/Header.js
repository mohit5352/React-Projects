// Header.js
import React from 'react';

function Header({ toggleTheme, handleLogout }) {
  return (
    <header className="header-container">
      <div className="header-column">
        <h1 className="app-name">My To-Do List</h1>
      </div>
      <div className="header-column">
        <div className="theme-buttons">
          <button onClick={() => toggleTheme('default')}>Default Theme</button>
          <button onClick={() => toggleTheme('dark')}>Dark Theme</button>
        </div>
      </div>
      <div className="header-column">
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
}

export default Header;
