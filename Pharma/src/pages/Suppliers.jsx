import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Suppliers = () => {
  const { suppliers, setSuppliers } = useContext(AuthContext);
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // 10 digit Phone Number Validation
    if (phone.length !== 10 || isNaN(phone)) {
      alert("Phone number must contain exactly 10 digits.");
      return;
    }

    const supplierData = { name, phone, email };

    if (editingIndex !== null) {
      const updated = [...suppliers];
      updated[editingIndex] = supplierData;
      setSuppliers(updated);
      setEditingIndex(null);
    } else {
      setSuppliers([...suppliers, supplierData]);
    }

    setName(''); setPhone(''); setEmail('');
  };

  const handleEdit = (idx) => {
    setEditingIndex(idx);
    setName(suppliers[idx].name);
    setPhone(suppliers[idx].phone);
    setEmail(suppliers[idx].email);
  };

  const handleDelete = (idx) => {
    if (window.confirm("Delete this supplier?")) {
      setSuppliers(suppliers.filter((_, i) => i !== idx));
    }
  };

  return (
    <div>
      <div className="page-title">Supplier Registry Directory</div>
      
      <form onSubmit={handleSubmit} className="data-form">
        <h3>{editingIndex !== null ? 'Modify Supplier Profile' : 'Add New Supplier Vendor'}</h3>
        <div className="form-row">
          <input type="text" placeholder="Supplier Name" value={name} onChange={e => setName(e.target.value)} required />
          <input type="text" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} required />
          <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">{editingIndex !== null ? 'Update Record' : 'Register Supplier'}</button>
      </form>

      <table className="data-table">
        <thead>
          <tr>
            <th>Supplier Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((sup, idx) => (
            <tr key={idx}>
              <td>{sup.name}</td>
              <td>{sup.phone}</td>
              <td>{sup.email}</td>
              <td>
                <button className="btn-edit" onClick={() => handleEdit(idx)}>Edit</button>
                <button className="btn-delete" onClick={() => handleDelete(idx)}>Delete</button>
              </td>
            </tr>
          ))}
          {suppliers.length === 0 && (
            <tr><td colSpan="4" style={{ textAlign: 'center' }}>No suppliers verified inside the system database yet.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Suppliers;