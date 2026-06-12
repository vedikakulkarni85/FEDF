// ============================================================
// FILE: src/pages/SupplierPage.jsx
// Description: Supplier management page.
// Features: Add, Edit, Delete suppliers.
// All data saved to localStorage.
// Props:
//   suppliers    - array of supplier objects
//   setSuppliers - update suppliers array
//   addActivity  - log activity message
// ============================================================

import React, { useState } from 'react';
import { saveToStorage } from '../utils/storage';

function SupplierPage({ suppliers, setSuppliers, addActivity }) {
  // Controls whether the add/edit modal is visible
  const [showModal, setShowModal] = useState(false);

  // null = adding new; object = editing existing
  const [editSup, setEditSup] = useState(null);

  // Form fields
  const [form, setForm] = useState({ name: '', contact: '', email: '', address: '' });

  // ---- Open modal for ADDING a new supplier ----
  function openAdd() {
    setEditSup(null);
    setForm({ name: '', contact: '', email: '', address: '' });
    setShowModal(true);
  }

  // ---- Open modal pre-filled for EDITING an existing supplier ----
  function openEdit(sup) {
    setEditSup(sup);
    setForm({ ...sup });
    setShowModal(true);
  }

  // ---- Save supplier (handles both Add and Edit) ----
  function saveSupplier() {
    if (!form.name.trim()) {
      alert('Supplier name is required.');
      return;
    }

    let updated;
    if (editSup) {
      // EDIT: replace matching supplier by ID
      updated = suppliers.map(s =>
        s.id === editSup.id ? { ...form, id: editSup.id } : s
      );
      addActivity(`✏️ Updated supplier: ${form.name}`);
    } else {
      // ADD: create new with unique timestamp ID
      updated = [...suppliers, { ...form, id: Date.now() }];
      addActivity(`➕ Added supplier: ${form.name}`);
    }

    setSuppliers(updated);
    saveToStorage('suppliers', updated);
    setShowModal(false);
  }

  // ---- Delete a supplier after confirmation ----
  function deleteSupplier(id, name) {
    if (!window.confirm(`Delete supplier "${name}"?`)) return;
    const updated = suppliers.filter(s => s.id !== id);
    setSuppliers(updated);
    saveToStorage('suppliers', updated);
    addActivity(`🗑️ Deleted supplier: ${name}`);
  }

  return (
    <div>
      <div className="page-title">Supplier Management</div>

      <div style={{ marginBottom: '16px' }}>
        <button className="btn btn-success" onClick={openAdd}>+ Add Supplier</button>
      </div>

      {/* Suppliers table */}
      <div className="card" style={{ padding: 0 }}>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Supplier Name</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', color: '#999', padding: '20px' }}>
                  No suppliers added yet.
                </td>
              </tr>
            ) : suppliers.map((s, i) => (
              <tr key={s.id}>
                <td>{i + 1}</td>
                <td><strong>{s.name}</strong></td>
                <td>{s.contact || '-'}</td>
                <td>{s.email || '-'}</td>
                <td>{s.address || '-'}</td>
                <td>
                  <button className="btn btn-warning btn-sm" onClick={() => openEdit(s)}>Edit</button>
                  {' '}
                  <button className="btn btn-danger btn-sm" onClick={() => deleteSupplier(s.id, s.name)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---- Add / Edit Supplier Modal ---- */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>{editSup ? 'Edit Supplier' : 'Add New Supplier'}</h3>

            <div className="form-group">
              <label>Supplier Name *</label>
              <input
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. MedPharma India"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Contact Number</label>
                <input
                  value={form.contact}
                  onChange={e => setForm({ ...form, contact: e.target.value })}
                  placeholder="e.g. 9876543210"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="e.g. info@medpharma.com"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Address</label>
              <input
                value={form.address}
                onChange={e => setForm({ ...form, address: e.target.value })}
                placeholder="e.g. Hyderabad, Telangana"
              />
            </div>

            <div className="btn-group">
              <button className="btn btn-primary" onClick={saveSupplier}>
                {editSup ? 'Update' : 'Save'}
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

export default SupplierPage;
