// ============================================================
// FILE: src/components/Sidebar.jsx
// Description: Left navigation menu with sections and menu items.
// Admin users see an extra "Admin Panel" option.
// Props:
//   activePage  - current page key (e.g. "dashboard", "medicines")
//   onNavigate  - function(key) called when a menu item is clicked
//   role        - "admin" or "user" — controls visibility of Admin Panel
// ============================================================

import React from 'react';

function Sidebar({ activePage, onNavigate, role }) {
  // Menu items array
  // { section: "..." } renders a heading
  // { key: "...", label: "..." } renders a clickable menu item
  const menu = [
    { section: 'Main' },
    { key: 'dashboard', label: '📊 Dashboard' },
    { section: 'Inventory' },
    { key: 'medicines', label: '💊 Medicines' },
    { key: 'dispense',  label: '🔖 Dispense' },
    { key: 'expiry',    label: '⚠️ Expiry Alerts' },
    { section: 'Management' },
    { key: 'suppliers', label: '🏭 Suppliers' },
    { section: 'Reports' },
    { key: 'reports',   label: '📄 Stock Report' },
    { key: 'history',   label: '📋 Dispense History' },
  ];

  // Only admin users see the Admin Panel option
  if (role === 'admin') {
    menu.push({ section: 'Admin' });
    menu.push({ key: 'admin', label: '⚙️ Admin Panel' });
  }

  return (
    <div className="sidebar">
      {menu.map((item, i) =>
        // If item has "section", render a heading; otherwise render a clickable menu item
        item.section ? (
          <div key={i} className="menu-section">{item.section}</div>
        ) : (
          <div
            key={item.key}
            className={`menu-item ${activePage === item.key ? 'active' : ''}`}
            onClick={() => onNavigate(item.key)}
          >
            {item.label}
          </div>
        )
      )}
    </div>
  );
}

export default Sidebar;
