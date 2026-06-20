import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { formatDate } from '../utils/helpers';

const ExpiryTracking = () => {
  const { medicines } = useContext(AuthContext);
  const today = new Date();

  const getExpiryStatus = (dateStr) => {
    const expDate = new Date(dateStr);
    const timeDiff = expDate - today;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (daysDiff <= 0) return { label: 'EXPIRED', class: 'critical-badge' };
    if (daysDiff <= 30) return { label: `Expires in ${daysDiff} Days`, class: 'badge-low' };
    return { label: 'Safe Stock', class: 'normal-badge' };
  };

  return (
    <div>
      <div className="page-title">Medicine Expiry Intelligence Tracker</div>
      <p style={{ marginBottom: '1.5rem' }}>Monitors shelf-life metrics across medicine inventory items.</p>

      <table className="data-table">
        <thead>
          <tr>
            <th>Medicine Name</th>
            <th>Barcode ID</th>
            <th>Expiry Date</th>
            <th>Status Condition</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((med, index) => {
            const status = getExpiryStatus(med.expiryDate);
            return (
              <tr key={index}>
                <td><strong>{med.name}</strong></td>
                <td>{med.barcode}</td>
                <td>{formatDate(med.expiryDate)}</td>
                <td><span className={status.class}>{status.label}</span></td>
              </tr>
            );
          })}
          {medicines.length === 0 && (
            <tr><td colSpan="4" style={{ textAlign: 'center' }}>No stock found in storage database configurations.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ExpiryTracking;