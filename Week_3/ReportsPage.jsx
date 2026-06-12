// ============================================================
// FILE: src/pages/ReportsPage.jsx
// Description: Stock Report page showing full inventory with value.
// Read-only — no CRUD here, just a comprehensive view.
// Props:
//   medicines - array of all medicine objects
// ============================================================

import React from 'react';
import { isExpired, isNearExpiry, formatDate } from '../utils/dateHelpers';

function ReportsPage({ medicines }) {
  // Calculate total stock value = sum of (price × quantity) for all medicines
  const totalValue = medicines.reduce(
    (sum, m) => sum + (parseFloat(m.price || 0) * parseInt(m.quantity || 0)),
    0
  );

  return (
    <div>
      <div className="page-title">Stock Report</div>

      {/* Summary stat cards */}
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div className="stat-card stat-blue">
          <div className="stat-num">{medicines.length}</div>
          <div className="stat-label">Total Medicine Types</div>
        </div>
        <div className="stat-card stat-green">
          <div className="stat-num">
            {medicines.reduce((s, m) => s + parseInt(m.quantity || 0), 0)}
          </div>
          <div className="stat-label">Total Units in Stock</div>
        </div>
        <div className="stat-card stat-blue">
          <div className="stat-num">₹{totalValue.toFixed(0)}</div>
          <div className="stat-label">Total Stock Value</div>
        </div>
      </div>

      {/* Full inventory table */}
      <div className="card" style={{ padding: 0 }}>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid #e2e8f0' }}>
          <strong>Complete Inventory List</strong>
        </div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Medicine Name</th>
              <th>Barcode</th>
              <th>Qty</th>
              <th>Price (₹)</th>
              <th>Stock Value</th>
              <th>Expiry Date</th>
              <th>Supplier</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {medicines.length === 0 ? (
              <tr>
                <td colSpan={9} style={{ textAlign: 'center', color: '#999', padding: '20px' }}>
                  No medicines in inventory.
                </td>
              </tr>
            ) : medicines.map((m, i) => (
              <tr
                key={m.id}
                className={
                  isExpired(m.expiryDate) ? 'expired-row'
                  : isNearExpiry(m.expiryDate) ? 'near-expiry-row'
                  : ''
                }
              >
                <td>{i + 1}</td>
                <td><strong>{m.name}</strong></td>
                <td><code>{m.barcode}</code></td>
                <td>{m.quantity}</td>
                <td>₹{parseFloat(m.price || 0).toFixed(2)}</td>
                {/* Stock value = price × quantity */}
                <td>₹{(parseFloat(m.price || 0) * parseInt(m.quantity || 0)).toFixed(2)}</td>
                <td>{formatDate(m.expiryDate)}</td>
                <td>{m.supplier || '-'}</td>
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
    </div>
  );
}

export default ReportsPage;
