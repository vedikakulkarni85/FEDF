// ============================================================
// FILE: src/pages/MedicinePage.jsx
// Description: Medicine management page.
// Features: Search, Add, Edit, Delete medicines.
// All data is saved to localStorage so it persists after refresh.
// Props:
//   medicines    - array of medicine objects (from App state)
//   setMedicines - function to update medicines array
//   suppliers    - array of suppliers (used in the dropdown)
//   addActivity  - function to log an activity message
// ============================================================

import React, { useState } from 'react';
import { isExpired, isNearExpiry, formatDate } from '../utils/dateHelpers';
import { saveToStorage } from '../utils/storage';

function MedicinePage({ medicines, setMedicines, suppliers, addActivity }) {
  // Search query typed by user
  const [search, setSearch] = useState('');

  // Controls whether the add/edit modal popup is open
  const [showModal, setShowModal] = useState(false);

  // null = adding new medicine; object = editing existing medicine
  const [editMed, setEditMed] = useState(null);

  // All form fields in one state object (easier to manage)
  const [form, setForm] = useState({
    name: '', barcode: '', quantity: '', expiryDate: '', supplier: '', price: ''
  });

  // ---- Open modal for ADDING a new medicine ----
  function openAdd() {
    setEditMed(null); // no existing medicine being edited
    setForm({ name: '', barcode: '', quantity: '', expiryDate: '', supplier: '', price: '' });
    setShowModal(true);
  }

  // ---- Open modal pre-filled for EDITING an existing medicine ----
  function openEdit(med) {
    setEditMed(med);          // remember which medicine we're editing
    setForm({ ...med });       // copy all fields into form
    setShowModal(true);
  }

  // ---- Save medicine (handles both Add and Edit) ----
  function saveMedicine() {
    // Validation: required fields must be filled
    if (!form.name || !form.barcode || !form.quantity) {
      alert('Please fill Name, Barcode and Quantity.');
      return;
    }

    let updated;
    if (editMed) {
      // EDIT: replace the matching medicine in the array using its ID
      updated = medicines.map(m =>
        m.id === editMed.id
          ? { ...form, id: editMed.id, quantity: parseInt(form.quantity) }
          : m
      );
      addActivity(`✏️ Edited medicine: ${form.name}`);
    } else {
      // ADD: create a new medicine with a unique ID (using timestamp)
      const newMed = {
        ...form,
        id: Date.now(),           // unique ID based on current time
        quantity: parseInt(form.quantity)
      };
      updated = [...medicines, newMed];
      addActivity(`➕ Added medicine: ${form.name}`);
    }

    // Update state and save to localStorage
    setMedicines(updated);
    saveToStorage('medicines', updated);
    setShowModal(false);
  }

  // ---- Delete a medicine after confirmation ----
  function deleteMedicine(id, name) {
    if (!window.confirm(`Delete "${name}"?`)) return;
    const updated = medicines.filter(m => m.id !== id);
    setMedicines(updated);
    saveToStorage('medicines', updated);
    addActivity(`🗑️ Deleted medicine: ${name}`);
  }

  // Filter medicines based on search input (by name or barcode)
  const filtered = medicines.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.barcode.includes(search)
  );

  return (
    <div>
      <div className="page-title">Medicine Management</div>

      {/* Search input and Add button */}
      <div className="search-bar">
        <input
          placeholder="Search by name or barcode..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button className="btn btn-success" onClick={openAdd}>+ Add Medicine</button>
      </div>

      {/* Medicines table */}
      <div className="card" style={{ padding: 0 }}>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Medicine Name</th>
              <th>Barcode</th>
              <th>Qty</th>
              <th>Expiry Date</th>
              <th>Supplier</th>
              <th>Price (₹)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={9} style={{ textAlign: 'center', color: '#999', padding: '20px' }}>
                  No medicines found. Add some using the button above.
                </td>
              </tr>
            ) : filtered.map((m, i) => (
              // Apply colored row class based on expiry status
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
                <td>{formatDate(m.expiryDate)}</td>
                <td>{m.supplier || '-'}</td>
                <td>₹{parseFloat(m.price || 0).toFixed(2)}</td>
                <td>
                  {/* Badge showing current status of the medicine */}
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
                <td>
                  <button className="btn btn-warning btn-sm" onClick={() => openEdit(m)}>Edit</button>
                  {' '}
                  <button className="btn btn-danger btn-sm" onClick={() => deleteMedicine(m.id, m.name)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---- Add / Edit Modal Popup ---- */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>{editMed ? 'Edit Medicine' : 'Add New Medicine'}</h3>

            {/* Two fields per row */}
            <div className="form-row">
              <div className="form-group">
                <label>Medicine Name *</label>
                <input
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Paracetamol 500mg"
                />
              </div>
              <div className="form-group">
                <label>Barcode *</label>
                <input
                  value={form.barcode}
                  onChange={e => setForm({ ...form, barcode: e.target.value })}
                  placeholder="e.g. 1234567890"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Quantity *</label>
                <input
                  type="number"
                  min="0"
                  value={form.quantity}
                  onChange={e => setForm({ ...form, quantity: e.target.value })}
                  placeholder="e.g. 100"
                />
              </div>
              <div className="form-group">
                <label>Price (₹)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.price}
                  onChange={e => setForm({ ...form, price: e.target.value })}
                  placeholder="e.g. 25.50"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Expiry Date</label>
                <input
                  type="date"
                  value={form.expiryDate}
                  onChange={e => setForm({ ...form, expiryDate: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Supplier</label>
                {/* Supplier dropdown populated from suppliers list */}
                <select
                  value={form.supplier}
                  onChange={e => setForm({ ...form, supplier: e.target.value })}
                >
                  <option value="">-- Select Supplier --</option>
                  {suppliers.map(s => (
                    <option key={s.id} value={s.name}>{s.name}</option>
                  ))}
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="btn-group">
              <button className="btn btn-primary" onClick={saveMedicine}>
                {editMed ? 'Update' : 'Save'}
              </button>
              <button
                className="btn"
                style={{ background: '#e2e8f0' }}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MedicinePage;
