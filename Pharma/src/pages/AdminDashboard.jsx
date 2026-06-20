import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const AdminDashboard = () => {
  const { medicines, employees, suppliers } = useContext(AuthContext);

  const today = new Date();
  const in30Days = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);

  const lowStockItems   = medicines.filter(m => Number(m.quantity) <= 10);
  const expiredItems    = medicines.filter(m => new Date(m.expiryDate) < today);
  const nearExpiryItems = medicines.filter(m => {
    const exp = new Date(m.expiryDate);
    return exp >= today && exp <= in30Days;
  });

  return (
    <div>
      <div className="page-title">📊 Admin Dashboard Overview</div>

      {/* Stat Cards */}
      <div className="stats-grid">
        <div className="stat-card stat-blue">
          <div className="stat-num">{medicines.length}</div>
          <div className="stat-label">Total Medicines</div>
        </div>
        <div className="stat-card stat-green">
          <div className="stat-num">{employees.length}</div>
          <div className="stat-label">Total Employees</div>
        </div>
        <div className="stat-card stat-blue">
          <div className="stat-num">{suppliers.length}</div>
          <div className="stat-label">Total Suppliers</div>
        </div>
        <div className="stat-card stat-yellow">
          <div className="stat-num">{lowStockItems.length}</div>
          <div className="stat-label">Low Stock Items (≤10)</div>
        </div>
      </div>

      {/* Expiry Alerts */}
      {expiredItems.length > 0 && (
        <div className="alert alert-danger">
          <strong>🚨 Expired Medicines ({expiredItems.length})</strong>
          <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
            {expiredItems.map((m, i) => (
              <li key={i}><strong>{m.name}</strong> — expired on {new Date(m.expiryDate).toLocaleDateString()} &nbsp;<span className="badge badge-danger">{m.quantity} units</span></li>
            ))}
          </ul>
        </div>
      )}

      {nearExpiryItems.length > 0 && (
        <div className="alert alert-warning">
          <strong>⚠️ Expiring Within 30 Days ({nearExpiryItems.length})</strong>
          <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
            {nearExpiryItems.map((m, i) => (
              <li key={i}><strong>{m.name}</strong> — expires {new Date(m.expiryDate).toLocaleDateString()} &nbsp;<span className="badge badge-warning">{m.quantity} units</span></li>
            ))}
          </ul>
        </div>
      )}

      {/* Low Stock Alerts */}
      {lowStockItems.length > 0 && (
        <div className="alert alert-warning">
          <strong>📦 Low Stock Alert ({lowStockItems.length})</strong>
          <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
            {lowStockItems.map((m, i) => (
              <li key={i}><strong>{m.name}</strong> — only <span className="badge badge-warning">{m.quantity} units</span> remaining</li>
            ))}
          </ul>
        </div>
      )}

      {/* Inventory Quickview */}
      <div className="card">
        <div className="card-title">System Inventory Quickview</div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Medicine Name</th>
              <th>Supplier</th>
              <th>Expiry Date</th>
              <th>Stock Status</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((med, index) => {
              const isExpired   = new Date(med.expiryDate) < today;
              const isNearExpiry = !isExpired && new Date(med.expiryDate) <= in30Days;
              const isLowStock  = Number(med.quantity) <= 10;
              return (
                <tr key={index} className={isExpired ? 'expired-row' : isNearExpiry ? 'near-expiry-row' : ''}>
                  <td>{med.name}</td>
                  <td>{med.supplier}</td>
                  <td>
                    {new Date(med.expiryDate).toLocaleDateString()}
                    {isExpired    && <span className="badge badge-danger"  style={{ marginLeft: '8px' }}>Expired</span>}
                    {isNearExpiry && <span className="badge badge-warning" style={{ marginLeft: '8px' }}>Near Expiry</span>}
                  </td>
                  <td>
                    <span className={isLowStock ? 'badge badge-warning' : 'badge badge-success'}>
                      {med.quantity} units
                    </span>
                  </td>
                </tr>
              );
            })}
            {medicines.length === 0 && (
              <tr><td colSpan="4" style={{ textAlign: 'center', color: '#718096' }}>No stock data available.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
