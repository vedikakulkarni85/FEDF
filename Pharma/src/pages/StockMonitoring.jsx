import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { formatCurrency } from '../utils/helpers';

const StockMonitoring = () => {
  const { medicines } = useContext(AuthContext);

  // Compute general investment aggregates
  const totalFinancialValue = medicines.reduce((acc, med) => acc + (Number(med.price) * Number(med.quantity)), 0);
  const aggregateStockUnits = medicines.reduce((acc, med) => acc + Number(med.quantity), 0);

  return (
    <div>
      <div className="page-title">Stock Asset Monitoring Panel (Admin Only)</div>
      
      <div className="dashboard-grid" style={{ marginBottom: '2rem' }}>
        <div className="card">
          <h3>Total Units Count</h3>
          <p className="card-value">{aggregateStockUnits} units</p>
        </div>
        <div className="card">
          <h3>Inventory Net Asset Value</h3>
          <p className="card-value" style={{ color: 'var(--success-color)' }}>{formatCurrency(totalFinancialValue)}</p>
        </div>
      </div>

      <h3>Detailed Inventory Valuation Breakdown</h3>
      <table className="data-table">
        <thead>
          <tr>
            <th>Medicine Name</th>
            <th>Unit Cost Price</th>
            <th>Quantity on Hand</th>
            <th>Asset Value Valuation</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((med, index) => (
            <tr key={index}>
              <td>{med.name}</td>
              <td>{formatCurrency(med.price)}</td>
              <td>{med.quantity}</td>
              <td><strong>{formatCurrency(Number(med.price) * Number(med.quantity))}</strong></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockMonitoring;