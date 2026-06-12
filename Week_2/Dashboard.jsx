// ============================================================
// FILE: src/pages/Dashboard.jsx
// Description: Dashboard page showing summary stats and alerts.
// Reads all data from the medicines and activities arrays.
// Props:
//   medicines  - array of all medicine objects
//   activities - array of recent activity log entries
// ============================================================

import React from 'react';
import { isExpired, isNearExpiry } from '../utils/dateHelpers';

function Dashboard({ medicines, activities }) {
  // Calculate stats dynamically from the medicines array
  const totalMeds  = medicines.length;
  const lowStock   = medicines.filter(m => m.quantity < 5).length;
  const expired    = medicines.filter(m => isExpired(m.expiryDate)).length;
  const nearExpiry = medicines.filter(m => isNearExpiry(m.expiryDate)).length;

  return (
    <div>
      <div className="page-title">Dashboard</div>

      {/* 4 stat cards at the top */}
      <div className="stats-grid">
        <div className="stat-card stat-blue">
          <div className="stat-num">{totalMeds}</div>
          <div className="stat-label">Total Medicines</div>
        </div>
        <div className="stat-card stat-yellow">
          <div className="stat-num">{lowStock}</div>
          <div className="stat-label">Low Stock (&lt;5)</div>
        </div>
        <div className="stat-card stat-red">
          <div className="stat-num">{expired}</div>
          <div className="stat-label">Expired Medicines</div>
        </div>
        <div className="stat-card stat-green">
          <div className="stat-num">{nearExpiry}</div>
          <div className="stat-label">Near Expiry (30 days)</div>
        </div>
      </div>

      {/* Two-column grid: alerts and activity log */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

        {/* Quick Alerts card */}
        <div className="card">
          <div className="card-title">⚠️ Quick Alerts</div>
          {expired === 0 && lowStock === 0 && nearExpiry === 0 && (
            <div className="alert alert-success">All medicines are in good condition!</div>
          )}
          {expired > 0 && (
            <div className="alert alert-danger">🚫 {expired} medicine(s) have expired!</div>
          )}
          {nearExpiry > 0 && (
            <div className="alert alert-warning">⚠️ {nearExpiry} medicine(s) expiring within 30 days.</div>
          )}
          {lowStock > 0 && (
            <div className="alert alert-warning">📦 {lowStock} medicine(s) have low stock (qty &lt; 5).</div>
          )}
        </div>

        {/* Recent Activity log card */}
        <div className="card">
          <div className="card-title">📋 Recent Activity</div>
          {activities.length === 0 ? (
            <p style={{ color: '#999', fontSize: '13px' }}>
              No activity yet. Add medicines or dispense to see logs here.
            </p>
          ) : (
            // Show only last 6 activity items
            activities.slice(0, 6).map((act, i) => (
              <div key={i} className="activity-item">
                {act.msg}
                <div className="activity-time">{act.time}</div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Low stock table - only shown if there are low stock medicines */}
      {lowStock > 0 && (
        <div className="card">
          <div className="card-title">📦 Low Stock Medicines</div>
          <table>
            <thead>
              <tr>
                <th>Medicine Name</th>
                <th>Barcode</th>
                <th>Quantity</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {medicines.filter(m => m.quantity < 5).map(m => (
                <tr key={m.id}>
                  <td>{m.name}</td>
                  <td><code>{m.barcode}</code></td>
                  <td>{m.quantity}</td>
                  <td><span className="badge badge-danger">Low Stock</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
