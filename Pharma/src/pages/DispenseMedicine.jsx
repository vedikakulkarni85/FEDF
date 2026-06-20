import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const DispenseMedicine = () => {
  const { medicines, setMedicines, dispenseHistory, setDispenseHistory, user } = useContext(AuthContext);

  const [selectedMedIndex, setSelectedMedIndex] = useState('');
  const [dispenseQty, setDispenseQty] = useState('');

  const handleDispense = (e) => {
    e.preventDefault();

    if (selectedMedIndex === '') {
      alert("Please select a valid medicine stock target");
      return;
    }

    const targetQty = Number(dispenseQty);
    if (targetQty <= 0) {
      alert("Quantity must be greater than zero.");
      return;
    }

    const medicine = medicines[selectedMedIndex];

    if (Number(medicine.quantity) < targetQty) {
      alert(`Insufficient stock! Only ${medicine.quantity} units are available.`);
      return;
    }

    // Deduct quantity value from global reference instance 
    const updatedStock = [...medicines];
    updatedStock[selectedMedIndex].quantity = Number(medicine.quantity) - targetQty;
    setMedicines(updatedStock);

    // Save transaction dispatch event into structural array
    const recordLog = {
      medicineName: medicine.name,
      quantity: targetQty,
      date: new Date().toISOString(),
      employeeName: user.username
    };

    setDispenseHistory([recordLog, ...dispenseHistory]);
    setDispenseQty('');
    setSelectedMedIndex('');
    alert("Medicine structural stock item dispatched successfully!");
  };

  return (
    <div>
      <div className="page-title">Dispense Counter Interface</div>
      <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <form onSubmit={handleDispense} className="login-form">
          <div className="form-group">
            <label>Select Medicine Target</label>
            <select value={selectedMedIndex} onChange={e => setSelectedMedIndex(e.target.value)} required>
              <option value="">-- Choose Medicine from Inventory --</option>
              {medicines.map((med, index) => (
                <option key={index} value={index} disabled={Number(med.quantity) <= 0}>
                  {med.name} (Available: {med.quantity}) {Number(med.quantity) <= 0 ? '[OUT OF STOCK]' : ''}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Quantity to Dispense</label>
            <input 
              type="number" 
              value={dispenseQty} 
              onChange={e => setDispenseQty(e.target.value)} 
              min="1" 
              placeholder="Enter units quantity" 
              required 
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Complete Transaction Dispense</button>
        </form>
      </div>
    </div>
  );
};

export default DispenseMedicine;