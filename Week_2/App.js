// ============================================================
// FILE: src/App.js
// Description: Root component of the Pharmacy Inventory System.
//
// This component:
//   1. Manages all global application state (medicines, suppliers, etc.)
//   2. Loads and saves data using localStorage (no backend needed)
//   3. Handles user login/logout using sessionStorage
//   4. Renders the correct page based on sidebar navigation
//
// DATA STORAGE:
//   All data is stored in browser localStorage under these keys:
//   - "medicines"       → array of medicine objects
//   - "suppliers"       → array of supplier objects
//   - "dispenseHistory" → array of dispense records
//   - "activities"      → array of activity log entries
//   User session is stored in sessionStorage under "user"
//   (sessionStorage clears when the browser tab is closed)
// ============================================================

import React, { useState } from 'react';

// ---- Utility functions ----
import { loadFromStorage, saveToStorage } from './utils/storage';

// ---- Layout components ----
import LoginPage from './components/LoginPage';
import Navbar    from './components/Navbar';
import Sidebar   from './components/Sidebar';

// ---- Page components ----
import Dashboard    from './pages/Dashboard';
import MedicinePage from './pages/MedicinePage';
import DispensePage from './pages/DispensePage';
import ExpiryPage   from './pages/ExpiryPage';
import SupplierPage from './pages/SupplierPage';
import ReportsPage  from './pages/ReportsPage';
import HistoryPage  from './pages/HistoryPage';
import AdminPage    from './pages/AdminPage';

function App() {

  // ============================================================
  // USER SESSION STATE
  // Stored in sessionStorage → persists during the browser tab session.
  // When user closes the tab, they need to login again.
  // ============================================================
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem('user')) || null;
    } catch {
      return null;
    }
  });

  // ============================================================
  // APP DATA STATE
  // All loaded from localStorage on first render.
  // Each useState uses a "lazy initializer" (arrow function) so
  // localStorage is only read once when the component first mounts.
  // ============================================================

  // Medicines: { id, name, barcode, quantity, expiryDate, supplier, price }
  const [medicines, setMedicines] = useState(
    () => loadFromStorage('medicines', [])
  );

  // Suppliers: { id, name, contact, email, address }
  const [suppliers, setSuppliers] = useState(
    () => loadFromStorage('suppliers', [])
  );

  // Dispense history: { id, medName, barcode, qty, date, time }
  const [dispenseHistory, setDispenseHistory] = useState(
    () => loadFromStorage('dispenseHistory', [])
  );

  // Activity log: { msg, time }
  const [activities, setActivities] = useState(
    () => loadFromStorage('activities', [])
  );

  // ============================================================
  // NAVIGATION STATE
  // Tracks which page is currently shown in the main area
  // ============================================================
  const [page, setPage] = useState('dashboard');

  // ============================================================
  // LOGIN / LOGOUT
  // ============================================================

  // Called when user submits the login form
  function handleLogin(userData) {
    setUser(userData);
    // Save session so it survives page refresh (but not tab close)
    sessionStorage.setItem('user', JSON.stringify(userData));
  }

  // Called when user clicks Logout in the navbar
  function handleLogout() {
    setUser(null);
    sessionStorage.removeItem('user');
  }

  // ============================================================
  // ACTIVITY LOG HELPER
  // Called from any page component to add an activity entry.
  // Example: addActivity("Added medicine: Paracetamol")
  // ============================================================
  function addActivity(msg) {
    const entry = {
      msg,
      time: new Date().toLocaleString('en-IN') // Indian date/time format
    };
    // Keep only the last 50 activities (so localStorage doesn't grow too large)
    const updated = [entry, ...activities].slice(0, 50);
    setActivities(updated);
    saveToStorage('activities', updated);
  }

  // ============================================================
  // RENDER LOGIC
  // If user is not logged in → show login page
  // Otherwise → show the main app layout
  // ============================================================

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // Decide which page component to render based on the "page" state
  function renderPage() {
    switch (page) {
      case 'dashboard':
        return (
          <Dashboard
            medicines={medicines}
            activities={activities}
          />
        );

      case 'medicines':
        return (
          <MedicinePage
            medicines={medicines}
            setMedicines={setMedicines}
            suppliers={suppliers}
            addActivity={addActivity}
          />
        );

      case 'dispense':
        return (
          <DispensePage
            medicines={medicines}
            setMedicines={setMedicines}
            addActivity={addActivity}
            dispenseHistory={dispenseHistory}
            setDispenseHistory={setDispenseHistory}
          />
        );

      case 'expiry':
        return <ExpiryPage medicines={medicines} />;

      case 'suppliers':
        return (
          <SupplierPage
            suppliers={suppliers}
            setSuppliers={setSuppliers}
            addActivity={addActivity}
          />
        );

      case 'reports':
        return <ReportsPage medicines={medicines} />;

      case 'history':
        return (
          <HistoryPage
            dispenseHistory={dispenseHistory}
            setDispenseHistory={setDispenseHistory}
          />
        );

      case 'admin':
        return (
          <AdminPage
            medicines={medicines}
            suppliers={suppliers}
            dispenseHistory={dispenseHistory}
          />
        );

      default:
        return (
          <Dashboard
            medicines={medicines}
            activities={activities}
          />
        );
    }
  }

  // ============================================================
  // MAIN LAYOUT:
  // Navbar (top) → Layout row → Sidebar (left) + Main content (right)
  // ============================================================
  return (
    <div>
      {/* Top navigation bar with user info and logout */}
      <Navbar user={user} onLogout={handleLogout} />

      {/* Main layout: sidebar + page content side by side */}
      <div className="layout">
        <Sidebar
          activePage={page}
          onNavigate={setPage}
          role={user.role}
        />
        <div className="main">
          {renderPage()}
        </div>
      </div>
    </div>
  );
}

export default App;
