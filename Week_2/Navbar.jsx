// ============================================================
// FILE: src/components/Navbar.jsx
// Description: Top navigation bar showing app name and user info.
// Props:
//   user     - { username, role } object of logged-in user
//   onLogout - function called when Logout is clicked
// ============================================================

import React from 'react';

function Navbar({ user, onLogout }) {
  return (
    <div className="navbar">
      <h2>💊 PharmaSys - Pharmacy Inventory</h2>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        {/* Show who is logged in and their role */}
        <span style={{ background: 'none', padding: 0, fontSize: '13px' }}>
          👤 {user.username} ({user.role})
        </span>
        {/* Logout button */}
        <span onClick={onLogout}>🚪 Logout</span>
      </div>
    </div>
  );
}

export default Navbar;
