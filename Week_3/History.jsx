import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const History = () => {
  const { dispenseHistory } = useContext(AuthContext);

  return (
    <div>
      <div className="page-title">Global System Dispense Audit Logs (Admin View)</div>
      <table className="data-table">
        <thead>
          <tr>
            <th>Date & Time</th>
            <th>Medicine Name</th>
            <th>Quantity Dispatched</th>
            <th>Processed By</th>
          </tr>
        </thead>
        <tbody>
          {dispenseHistory.map((item, index) => (
            <tr key={index}>
              <td>{new Date(item.date).toLocaleString()}</td>
              <td>{item.medicineName}</td>
              <td>{item.quantity}</td>
              <td><span className="badge-ok">{item.employeeName}</span></td>
            </tr>
          ))}
          {dispenseHistory.length === 0 && (
            <tr><td colSpan="4" style={{ textAlign: 'center' }}>No global system transactions recorded.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default History;