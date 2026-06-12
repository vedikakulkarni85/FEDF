// ============================================================
// FILE: src/pages/HistoryPage.jsx
// Description: Full dispense history log.
// Users can view all past dispenses and optionally clear all records.
// Props:
//   dispenseHistory    - array of dispense records
//   setDispenseHistory - function to update the history
// ============================================================

import React from 'react';
import { saveToStorage } from '../utils/storage';

function HistoryPage({ dispenseHistory, setDispenseHistory }) {
  // ---- Clear all dispense records after confirmation ----
  function clearHistory() {
    if (!window.confirm('Clear all dispense history?')) return;
    setDispenseHistory([]);
    saveToStorage('dispenseHistory', []); // clear from localStorage too
  }

  return (
    <div>
      <div className="page-title">Dispense History</div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <p style={{ fontSize: '13px', color: '#666' }}>
          Total records: {dispenseHistory.length}
        </p>
        {/* Only show "Clear" button if there are records */}
        {dispenseHistory.length > 0 && (
          <button className="btn btn-danger btn-sm" onClick={clearHistory}>
            Clear All History
          </button>
        )}
      </div>

      <div className="card" style={{ padding: 0 }}>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Medicine Name</th>
              <th>Barcode</th>
              <th>Qty Dispensed</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {dispenseHistory.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', color: '#999', padding: '20px' }}>
                  No dispense records found.
                </td>
              </tr>
            ) : dispenseHistory.map((r, i) => (
              <tr key={r.id}>
                <td>{i + 1}</td>
                <td>{r.medName}</td>
                <td><code>{r.barcode}</code></td>
                <td>{r.qty}</td>
                <td>{r.date}</td>
                <td>{r.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HistoryPage;
