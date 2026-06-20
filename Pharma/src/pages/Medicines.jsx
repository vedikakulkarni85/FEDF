import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Medicines = () => {
  const { medicines, setMedicines, suppliers, user } = useContext(AuthContext);
  const isAdmin = user?.role === 'admin';

  // Form Field States
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [supplier, setSupplier] = useState('');
  const [barcode, setBarcode] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const handleSave = (e) => {
    e.preventDefault();

    // Data Validations
    if (Number(quantity) <= 0) {
      alert("Quantity must be greater than zero.");
      return;
    }
    if (Number(price) <= 0) {
      alert("Price must be greater than zero.");
      return;
    }

    // Check if expiry date is prior to current date
    const today = new Date().toISOString().split('T')[0];
    if (expiryDate < today) {
      alert("Expired medicines cannot be added.");
      return;
    }

    // Barcode Unique validation check
    const barcodeExists = medicines.some((med, idx) => med.barcode === barcode && idx !== editingIndex);
    if (barcodeExists) {
      alert("Barcode already exists.");
      return;
    }

    const medicineData = { name, category, supplier, barcode, quantity, price, expiryDate };

    if (editingIndex !== null) {
      const updated = [...medicines];
      updated[editingIndex] = medicineData;
      setMedicines(updated);
      setEditingIndex(null);
    } else {
      setMedicines([...medicines, medicineData]);
    }

    // Clear Fields
    setName(''); setCategory(''); setSupplier(''); setBarcode(''); setQuantity(''); setPrice(''); setExpiryDate('');
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    const target = medicines[index];
    setName(target.name);
    setCategory(target.category);
    setSupplier(target.supplier);
    setBarcode(target.barcode);
    setQuantity(target.quantity);
    setPrice(target.price);
    setExpiryDate(target.expiryDate);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this medicine?")) {
      setMedicines(medicines.filter((_, idx) => idx !== index));
    }
  };

  const filteredMedicines = medicines.filter(med => 
    med.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    med.barcode.includes(searchQuery)
  );

  return (
    <div>
      <div className="page-title">Medicine Stock Management</div>
      
      <form onSubmit={handleSave} className="data-form">
        <h3>{editingIndex !== null ? 'Modify Medicine Data' : 'Add New Medicine Item'}</h3>
        <div className="form-row">
          <input type="text" placeholder="Medicine Name" value={name} onChange={e => setName(e.target.value)} required />
          <input type="text" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} required />
          
          <select value={supplier} onChange={e => setSupplier(e.target.value)} required>
            <option value="">Select Supplier</option>
            {suppliers.map((s, i) => <option key={i} value={s.name}>{s.name}</option>)}
          </select>
          
          <input type="text" placeholder="Barcode ID" value={barcode} onChange={e => setBarcode(e.target.value)} required />
          <input type="number" placeholder="Quantity" value={quantity} onChange={e => setQuantity(e.target.value)} required />
          <input type="number" step="0.01" placeholder="Price ($)" value={price} onChange={e => setPrice(e.target.value)} required />
          <input type="date" placeholder="Expiry Date" value={expiryDate} onChange={e => setExpiryDate(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">{editingIndex !== null ? 'Update' : 'Add Medicine'}</button>
        {editingIndex !== null && <button type="button" className="btn" onClick={() => { setEditingIndex(null); setName(''); setCategory(''); setSupplier(''); setBarcode(''); setQuantity(''); setPrice(''); setExpiryDate(''); }}>Cancel</button>}
      </form>

      <div style={{ margin: '1.5rem 0' }}>
        <input 
          type="text" 
          placeholder="🔍 Search medicines by name or barcode ID..." 
          className="search-bar"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Supplier</th>
            <th>Barcode</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Expiry Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredMedicines.map((med, idx) => (
            <tr key={idx}>
              <td>{med.name}</td>
              <td>{med.category}</td>
              <td>{med.supplier}</td>
              <td>{med.barcode}</td>
              <td>{med.quantity}</td>
              <td>${Number(med.price).toFixed(2)}</td>
              <td>{med.expiryDate}</td>
              <td>
                <button className="btn-edit" onClick={() => handleEdit(idx)}>Edit</button>
                {isAdmin && (
                  <button className="btn-delete" onClick={() => handleDelete(idx)}>Delete</button>
                )}
              </td>
            </tr>
          ))}
          {filteredMedicines.length === 0 && (
            <tr><td colSpan="8" style={{ textAlign: 'center' }}>No record metrics match selection.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Medicines;