import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Reports = () => {
  const { dispenseHistory, user } = useContext(AuthContext);

  // Filter system transaction values attributed to current runtime employee session object
  const systemReportData = dispenseHistory.filter(item => item.employeeName === user.username);

  return (
    <div>
      <div className="page-title">My Operational Activity Reports</div>
      <p>Log displaying stock distribution events completed during active sessions.</p>
      
      <table className="data-table">
        <thead>
          <tr>
            <th>Date Timestamp</th>
            <th>Item Name</th>
            <th>Dispensed Quantity</th>
          </tr>
        </thead>
        <tbody>
          {systemReportData.map((rpt, idx) => (
            <tr key={idx}>
              <td>{new Date(rpt.date).toLocaleString()}</td>
              <td>{rpt.medicineName}</td>
              <td>{rpt.quantity} units</td>
            </tr>
          ))}
          {systemReportData.length === 0 && (
            <tr><td colSpan="3" style={{ textAlign: 'center' }}>No shifts or dispatches completed inside system metrics for this account.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Reports;