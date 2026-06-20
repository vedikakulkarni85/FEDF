import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const isAdmin = user?.role === 'admin';

  return (
    <aside className="sidebar">
      <ul className="sidebar-menu">
        {/* Main Section */}
        <li><div className="sidebar-section">Main</div></li>
        <li>
          <NavLink
            to={isAdmin ? "/admin-dashboard" : "/employee-dashboard"}
            className={({ isActive }) => isActive ? "active" : ""}
          >
            📊 Dashboard
          </NavLink>
        </li>

        {/* Inventory Section */}
        <li><div className="sidebar-section">Inventory</div></li>
        <li><NavLink to="/medicines" className={({ isActive }) => isActive ? "active" : ""}>💊 Manage Medicines</NavLink></li>
        <li><NavLink to="/dispense" className={({ isActive }) => isActive ? "active" : ""}>🔖 Dispense Medicine</NavLink></li>
        <li><NavLink to="/expiry" className={({ isActive }) => isActive ? "active" : ""}>⚠️ Expiry Tracking</NavLink></li>

        {/* Management Section */}
        <li><div className="sidebar-section">Management</div></li>
        <li><NavLink to="/suppliers" className={({ isActive }) => isActive ? "active" : ""}>🏭 Manage Suppliers</NavLink></li>

        {isAdmin && (
          <>
            <li><NavLink to="/employees" className={({ isActive }) => isActive ? "active" : ""}>👥 Manage Employees</NavLink></li>
            <li><NavLink to="/stock-monitoring" className={({ isActive }) => isActive ? "active" : ""}>📦 Stock Assets</NavLink></li>
          </>
        )}

        {/* Reports Section */}
        <li><div className="sidebar-section">Reports</div></li>
        {isAdmin && (
          <li><NavLink to="/history" className={({ isActive }) => isActive ? "active" : ""}>📋 Dispense History</NavLink></li>
        )}
        {!isAdmin && (
          <li><NavLink to="/reports" className={({ isActive }) => isActive ? "active" : ""}>📄 My Reports</NavLink></li>
        )}
      </ul>
    </aside>
  );
};

export default Sidebar;
