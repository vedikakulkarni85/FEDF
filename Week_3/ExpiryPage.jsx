// ============================================================
// FILE: src/pages/ExpiryPage.jsx
// Description: Expiry Alerts page showing expired and near-expiry medicines.
// Read-only page — no CRUD operations.
// Props:
//   medicines - array of all medicine objects
// ============================================================

import React from 'react';
import { isExpired, isNearExpiry, formatDate, today } from '../utils/dateHelpers';

function ExpiryPage({ medicines }) {
  // Filter medicines into two groups
  const expiredList = medicines.filter(m => isExpired(m.expiryDate));
  const nearList    = medicines.filter(m => isNearExpiry(m.expiryDate));

  return (
    <div>
      <div className="page-title">Expiry Alerts</div>

      {/* Table 1: Already expired medicines */}
      <div className="card">
        <div className="card-title">🚫 Expired Medicines ({expiredList.length})</div>
        {expiredList.length === 0 ? (
          <div className="alert alert-success">✅ No expired medicines.</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Barcode</th>
                <th>Qty</th>
                <th>Expiry Date</th>
                <th>Supplier</th>
              </tr>
            </thead>
            <tbody>
              {expiredList.map((m, i) => (
                <tr key={m.id} className="expired-row">
                  <td>{i + 1}</td>
                  <td><strong>{m.name}</strong></td>
                  <td><code>{m.barcode}</code></td>
                  <td>{m.quantity}</td>
                  <td>
                    {formatDate(m.expiryDate)}{' '}
                    <span className="badge badge-danger">Expired</span>
                  </td>
                  <td>{m.supplier || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Table 2: Medicines expiring within the next 30 days */}
      <div className="card">
        <div className="card-title">⚠️ Near Expiry (within 30 days) ({nearList.length})</div>
        {nearList.length === 0 ? (
          <div className="alert alert-success">✅ No medicines near expiry.</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Barcode</th>
                <th>Qty</th>
                <th>Expiry Date</th>
                <th>Days Left</th>
              </tr>
            </thead>
            <tbody>
              {nearList.map((m, i) => {
                // Calculate how many days until expiry
                const daysLeft = Math.ceil(
                  (new Date(m.expiryDate) - new Date(today())) / (1000 * 60 * 60 * 24)
                );
                return (
                  <tr key={m.id} className="near-expiry-row">
                    <td>{i + 1}</td>
                    <td><strong>{m.name}</strong></td>
                    <td><code>{m.barcode}</code></td>
                    <td>{m.quantity}</td>
                    <td>{formatDate(m.expiryDate)}</td>
                    <td><span className="badge badge-warning">{daysLeft} days</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ExpiryPage;
