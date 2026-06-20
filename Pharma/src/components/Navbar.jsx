import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-brand">💊 PharmaSys - Pharmacy Inventory</div>
      {user && (
        <div className="navbar-user">
          <span>👤 {user.username} ({user.role.toUpperCase()})</span>
          <button className="logout-btn" onClick={logout}>🚪 Logout</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
