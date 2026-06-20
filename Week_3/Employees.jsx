import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Employees = () => {
  const { employees, setEmployees } = useContext(AuthContext);

  const [empId, setEmpId] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [designation, setDesignation] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const handleSave = (e) => {
    e.preventDefault();

    if (phone.length !== 10 || isNaN(phone)) {
      alert("Phone number must contain exactly 10 digits.");
      return;
    }

    const employeeData = { empId, name, phone, email, designation };

    if (editingIndex !== null) {
      const updated = [...employees];
      updated[editingIndex] = employeeData;
      setEmployees(updated);
      setEditingIndex(null);
    } else {
      setEmployees([...employees, employeeData]);
    }

    setEmpId(''); setName(''); setPhone(''); setEmail(''); setDesignation('');
  };

  return (
    <div>
      <div className="page-title">Employee Workforce Management (Admin Only)</div>
      
      <form onSubmit={handleSave} className="data-form">
        <h3>{editingIndex !== null ? 'Modify Employee Data' : 'Add New Staff Member'}</h3>
        <div className="form-row">
          <input type="text" placeholder="Employee ID" value={empId} onChange={e => setEmpId(e.target.value)} required />
          <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required />
          <input type="text" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="text" placeholder="Designation" value={designation} onChange={e => setDesignation(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Save Profile</button>
      </form>

      <table className="data-table">
        <thead>
          <tr>
            <th>Emp ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Designation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, index) => (
            <tr key={index}>
              <td>{emp.empId}</td>
              <td>{emp.name}</td>
              <td>{emp.phone}</td>
              <td>{emp.email}</td>
              <td>{emp.designation}</td>
              <td>
                <button className="btn-edit" onClick={() => {
                  setEditingIndex(index);
                  setEmpId(employees[index].empId);
                  setName(employees[index].name);
                  setPhone(employees[index].phone);
                  setEmail(employees[index].email);
                  setDesignation(employees[index].designation);
                }}>Edit</button>
                <button className="btn-delete" onClick={() => setEmployees(employees.filter((_, i) => i !== index))}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Employees;