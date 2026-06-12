// ============================================================
// FILE: src/pages/DispensePage.jsx
// Description: Barcode-based medicine dispensing page.
// User enters a barcode → medicine is found → quantity is reduced.
// Every dispense is logged to history.
// Props:
//   medicines           - all medicine objects
//   setMedicines        - update medicines array
//   addActivity         - log activity message
//   dispenseHistory     - array of past dispense records
//   setDispenseHistory  - update dispense history
// ============================================================

import React, { useState } from 'react';
import { today } from '../utils/dateHelpers';
import { saveToStorage } from '../utils/storage';

function DispensePage({ medicines, setMedicines, addActivity, dispenseHistory, setDispenseHistory }) {
  const [barcode, setBarcode] = useState('');
  const [qty, setQty] = useState(1);

  // message: { type: "success"|"danger"|"info", text: "..." } or null
  const [message, setMessage] = useState(null);

  // The medicine found by barcode search
  const [foundMed, setFoundMed] = useState(null);

  // ---- Search for medicine by barcode ----
  function searchByBarcode() {
    const med = medicines.find(m => m.barcode === barcode.trim());
    if (!med) {
      setFoundMed(null);
      setMessage({ type: 'danger', text: `No medicine found with barcode: ${barcode}` });
    } else {
      setFoundMed(med);
      setMessage(null); // clear any old message
    }
  }

  // ---- Perform the dispensing ----
  function dispense() {
    if (!foundMed) return;

    // Check if enough stock is available
    if (foundMed.quantity < qty) {
      setMessage({ type: 'danger', text: `Not enough stock. Available: ${foundMed.quantity}` });
      return;
    }

    // Update the quantity in the medicines array
    const updated = medicines.map(m =>
      m.id === foundMed.id ? { ...m, quantity: m.quantity - qty } : m
    );
    setMedicines(updated);
    saveToStorage('medicines', updated); // save reduced quantity to localStorage

    // Create a dispense history record
    const record = {
      id: Date.now(),
      medName: foundMed.name,
      barcode: foundMed.barcode,
      qty: qty,
      date: today(),
      time: new Date().toLocaleTimeString()
    };

    // Add to history (newest first)
    const updatedHistory = [record, ...dispenseHistory];
    setDispenseHistory(updatedHistory);
    saveToStorage('dispenseHistory', updatedHistory); // save history to localStorage

    // Log activity and show success message
    addActivity(`💊 Dispensed ${qty}x ${foundMed.name}`);
    setMessage({
      type: 'success',
      text: `Dispensed ${qty} unit(s) of "${foundMed.name}". New stock: ${foundMed.quantity - qty}`
    });

    // Update displayed medicine info with new (reduced) quantity
    setFoundMed({ ...foundMed, quantity: foundMed.quantity - qty });

    // Reset barcode and qty fields
    setBarcode('');
    setQty(1);
  }

  return (
    <div>
      <div className="page-title">Barcode Dispensing</div>

      <div className="card">
        <div className="card-title">🔖 Dispense Medicine</div>
        <p style={{ fontSize: '13px', color: '#666', marginBottom: '16px' }}>
          Enter the barcode of the medicine to dispense. The system will find it automatically.
        </p>

        <div className="form-row">
          <div className="form-group">
            <label>Enter Barcode</label>
            <input
              value={barcode}
              onChange={e => setBarcode(e.target.value)}
              placeholder="Type barcode and press Enter or click Find..."
              onKeyDown={e => e.key === 'Enter' && searchByBarcode()} // press Enter to search
            />
          </div>
          <div className="form-group">
            <label>Quantity to Dispense</label>
            <input
              type="number"
              min="1"
              value={qty}
              onChange={e => setQty(parseInt(e.target.value) || 1)}
            />
          </div>
        </div>

        <div className="btn-group">
          <button className="btn btn-primary" onClick={searchByBarcode}>🔍 Find Medicine</button>
          {/* Dispense button only appears after a medicine is found */}
          {foundMed && (
            <button className="btn btn-success" onClick={dispense}>✅ Dispense</button>
          )}
        </div>

        {/* Show success/error/info message */}
        {message && (
          <div className={`alert alert-${message.type}`} style={{ marginTop: '14px' }}>
            {message.text}
          </div>
        )}

        {/* Show found medicine details */}
        {foundMed && (
          <div className="alert alert-info" style={{ marginTop: '14px' }}>
            <strong>Found:</strong> {foundMed.name} &nbsp;|&nbsp;
            <strong>Barcode:</strong> {foundMed.barcode} &nbsp;|&nbsp;
            <strong>Available Qty:</strong> {foundMed.quantity} &nbsp;|&nbsp;
            <strong>Price:</strong> ₹{parseFloat(foundMed.price || 0).toFixed(2)}
          </div>
        )}
      </div>

      {/* Recent dispense records table */}
      <div className="card">
        <div className="card-title">📋 Recent Dispense Records</div>
        {dispenseHistory.length === 0 ? (
          <p style={{ color: '#999', fontSize: '13px' }}>No dispensing done yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Medicine</th>
                <th>Barcode</th>
                <th>Qty</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {/* Show only the most recent 10 dispenses */}
              {dispenseHistory.slice(0, 10).map((r, i) => (
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
        )}
      </div>
    </div>
  );
}

export default DispensePage;
