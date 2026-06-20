import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const EmployeeDashboard = () => {
  const { medicines, dispenseHistory } = useContext(AuthContext);

  const today = new Date();
  const in30Days = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);

  const availableMedicines = medicines.filter(m => Number(m.quantity) > 0).length;
  const lowStockItems      = medicines.filter(m => Number(m.quantity) <= 10);
  const expiredItems       = medicines.filter(m => new Date(m.expiryDate) < today);
  const nearExpiryItems    = medicines.filter(m => {
    const exp = new Date(m.expiryDate);
    return exp >= today && exp <= in30Days;
  });

  const todayStr = new Date().toLocaleDateString();
  const dispensedTodayCount = dispenseHistory
    .filter(item => new Date(item.date).toLocaleDateString() === todayStr)
    .reduce((sum, item) => sum + Number(item.quantity), 0);

  return (
    <div>
      <div className="page-title">📊 Employee Operations Dashboard</div>

      {/* Stat Cards */}
      <div className="stats-grid">
        <div className="stat-card stat-blue">
          <div className="stat-num">{availableMedicines}</div>
          <div className="stat-label">Available Medicines</div>
        </div>
        <div className="stat-card stat-green">
          <div className="stat-num">{dispensedTodayCount}</div>
          <div className="stat-label">Units Dispensed Today</div>
        </div>
        <div className="stat-card stat-yellow">
          <div className="stat-num">{lowStockItems.length}</div>
          <div className="stat-label">Low Stock Items</div>
        </div>
        <div className="stat-card stat-red">
          <div className="stat-num">{expiredItems.length}</div>
          <div className="stat-label">Expired Medicines</div>
        </div>
      </div>

      {/* Expiry Alerts */}
      {expiredItems.length > 0 && (
        <div className="alert alert-danger">
          <strong>🚨 Expired Medicines — Do Not Dispense ({expiredItems.length})</strong>
          <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
            {expiredItems.map((m, i) => (
              <li key={i}><strong>{m.name}</strong> — expired on {new Date(m.expiryDate).toLocaleDateString()}</li>
            ))}
          </ul>
        </div>
      )}

      {nearExpiryItems.length > 0 && (
        <div className="alert alert-warning">
          <strong>⚠️ Expiring Within 30 Days ({nearExpiryItems.length})</strong>
          <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
            {nearExpiryItems.map((m, i) => (
              <li key={i}><strong>{m.name}</strong> — expires {new Date(m.expiryDate).toLocaleDateString()}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Low Stock Alerts */}
      {lowStockItems.length > 0 && (
        <div className="alert alert-warning">
          <strong>📦 Low Stock — Please Notify Admin ({lowStockItems.length})</strong>
          <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
            {lowStockItems.map((m, i) => (
              <li key={i}><strong>{m.name}</strong> — only <span className="badge badge-warning">{m.quantity} units</span> left</li>
            ))}
          </ul>
        </div>
      )}

      {expiredItems.length === 0 && nearExpiryItems.length === 0 && lowStockItems.length === 0 && (
        <div className="alert alert-success">
          ✅ All medicines are well-stocked and within expiry. No alerts today!
        </div>
      )}
    </div>
  );
};

export default EmployeeDashboard;
