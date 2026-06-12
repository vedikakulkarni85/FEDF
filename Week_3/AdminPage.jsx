// ============================================================
// FILE: src/pages/AdminPage.jsx
// Description: Admin Panel - read-only overview for admin users.
// Shows summary tables for medicines, suppliers, and dispense stats.
// Props:
//   medicines       - array of medicine objects
//   suppliers       - array of supplier objects
//   dispenseHistory - array of dispense records
// ============================================================

import React from 'react';
import { isExpired, isNearExpiry, formatDate } from '../utils/dateHelpers';

function AdminPage({ medicines, suppliers, dispenseHistory }) {
  return (
    <div>
      <div className="page-title">⚙️ Admin Panel</div>

      {/* 3 summary stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '20px' }}>
        <div className="stat-card stat-blue">
          <div className="stat-num">{medicines.length}</div>
          <div className="stat-label">Total Medicines</div>
        </div>
        <div className="stat-card stat-green">
          <div className="stat-num">{suppliers.length}</div>
          <div className="stat-label">Total Suppliers</div>
        </div>
        <div className="stat-card stat-yellow">
          <div className="stat-num">{dispenseHistory.length}</div>
          <div className="stat-label">Total Dispenses</div>
        </div>
      </div>

      {/* Inventory overview table */}
      <div className="card">
        <div className="card-title">📦 Inventory Overview</div>
        <table>
          <thead>
            <tr><th>Medicine</th><th>Qty</th><th>Expiry</th><th>Status</th></tr>
          </thead>
          <tbody>
            {medicines.length === 0 ? (
              <tr><td colSpan={4} style={{ textAlign: 'center', color: '#999' }}>No data.</td></tr>
            ) : medicines.map(m => (
              <tr key={m.id}>
                <td>{m.name}</td>
                <td>{m.quantity}</td>
                <td>{formatDate(m.expiryDate)}</td>
                <td>
                  {isExpired(m.expiryDate) ? (
                    <span className="badge badge-danger">Expired</span>
                  ) : isNearExpiry(m.expiryDate) ? (
                    <span className="badge badge-warning">Near Expiry</span>
                  ) : m.quantity < 5 ? (
                    <span className="badge badge-warning">Low Stock</span>
                  ) : (
                    <span className="badge badge-success">OK</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Supplier overview table */}
      <div className="card">
        <div className="card-title">🏭 Supplier Overview</div>
        <table>
          <thead>
            <tr><th>Supplier</th><th>Contact</th><th>Email</th><th>Address</th></tr>
          </thead>
          <tbody>
            {suppliers.length === 0 ? (
              <tr><td colSpan={4} style={{ textAlign: 'center', color: '#999' }}>No suppliers added.</td></tr>
            ) : suppliers.map(s => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.contact || '-'}</td>
                <td>{s.email || '-'}</td>
                <td>{s.address || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Info note */}
      <div className="alert alert-info" style={{ marginTop: '10px' }}>
        <strong>Note:</strong> This admin panel shows a read-only overview.
        Go to the respective pages (Medicines, Suppliers) to make changes.
      </div>
    </div>
  );
}

export default AdminPage;
