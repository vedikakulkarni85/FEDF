import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

// ── Seed data shown when the app is first loaded ──────────────────────────
const DEFAULT_MEDICINES = [
  { name: 'Paracetamol 500mg', category: 'Analgesic', supplier: 'MedLife Pharma', barcode: 'MED001', quantity: '120', price: '2.50', expiryDate: '2026-12-31' },
  { name: 'Amoxicillin 250mg', category: 'Antibiotic', supplier: 'HealthCore Supplies', barcode: 'MED002', quantity: '80', price: '5.00', expiryDate: '2026-09-15' },
  { name: 'Ibuprofen 400mg',   category: 'Analgesic', supplier: 'MedLife Pharma',    barcode: 'MED003', quantity: '8',  price: '3.20', expiryDate: '2025-06-30' },
  { name: 'Cetirizine 10mg',   category: 'Antihistamine', supplier: 'PharmaPlus',   barcode: 'MED004', quantity: '200', price: '1.80', expiryDate: '2027-03-20' },
  { name: 'Metformin 500mg',   category: 'Antidiabetic', supplier: 'HealthCore Supplies', barcode: 'MED005', quantity: '5', price: '4.50', expiryDate: '2026-11-10' },
  { name: 'Omeprazole 20mg',   category: 'Antacid',    supplier: 'PharmaPlus',      barcode: 'MED006', quantity: '60', price: '6.00', expiryDate: '2026-08-25' },
  { name: 'Atorvastatin 10mg', category: 'Statin',     supplier: 'MedLife Pharma',  barcode: 'MED007', quantity: '45', price: '8.75', expiryDate: '2027-01-15' },
  { name: 'Azithromycin 500mg',category: 'Antibiotic', supplier: 'HealthCore Supplies', barcode: 'MED008', quantity: '3', price: '12.00', expiryDate: '2025-12-01' },
];

const DEFAULT_SUPPLIERS = [
  { name: 'MedLife Pharma',       contact: 'Ravi Kumar',   phone: '9876543210', email: 'ravi@medlife.com',    address: 'Hyderabad, Telangana' },
  { name: 'HealthCore Supplies',  contact: 'Priya Sharma', phone: '9123456780', email: 'priya@healthcore.com', address: 'Bengaluru, Karnataka' },
  { name: 'PharmaPlus',           contact: 'Arun Mehta',   phone: '9012345678', email: 'arun@pharmaplus.in',  address: 'Mumbai, Maharashtra' },
];

const DEFAULT_EMPLOYEES = [
  { name: 'Anjali Reddy',  role: 'Pharmacist',       username: 'employee', phone: '9988776655', email: 'anjali@pharmasys.com' },
  { name: 'Suresh Babu',   role: 'Store Assistant',  username: 'suresh',   phone: '9871234560', email: 'suresh@pharmasys.com' },
  { name: 'Meena Patel',   role: 'Billing Executive',username: 'meena',    phone: '9765432109', email: 'meena@pharmasys.com' },
];

const DEFAULT_HISTORY = [
  { medicineName: 'Paracetamol 500mg', quantity: '10', patientName: 'Ramesh G',   dispensedBy: 'employee', date: new Date(Date.now() - 86400000).toISOString() },
  { medicineName: 'Cetirizine 10mg',   quantity: '5',  patientName: 'Lakshmi V',  dispensedBy: 'employee', date: new Date(Date.now() - 172800000).toISOString() },
  { medicineName: 'Omeprazole 20mg',   quantity: '2',  patientName: 'Kiran M',    dispensedBy: 'employee', date: new Date().toISOString() },
];
// ──────────────────────────────────────────────────────────────────────────

const loadOrSeed = (key, defaultData) => {
  const stored = localStorage.getItem(key);
  if (stored) {
    const parsed = JSON.parse(stored);
    // If stored data is an empty array, still return seed data on first load
    if (Array.isArray(parsed) && parsed.length === 0) {
      localStorage.setItem(key, JSON.stringify(defaultData));
      return defaultData;
    }
    return parsed;
  }
  localStorage.setItem(key, JSON.stringify(defaultData));
  return defaultData;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('pharmacy_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [medicines,       setMedicines]       = useState(() => loadOrSeed('pharmacy_medicines',        DEFAULT_MEDICINES));
  const [employees,       setEmployees]       = useState(() => loadOrSeed('pharmacy_employees',        DEFAULT_EMPLOYEES));
  const [suppliers,       setSuppliers]       = useState(() => loadOrSeed('pharmacy_suppliers',        DEFAULT_SUPPLIERS));
  const [dispenseHistory, setDispenseHistory] = useState(() => loadOrSeed('pharmacy_dispense_history', DEFAULT_HISTORY));

  useEffect(() => { localStorage.setItem('pharmacy_medicines',        JSON.stringify(medicines));       }, [medicines]);
  useEffect(() => { localStorage.setItem('pharmacy_employees',        JSON.stringify(employees));       }, [employees]);
  useEffect(() => { localStorage.setItem('pharmacy_suppliers',        JSON.stringify(suppliers));       }, [suppliers]);
  useEffect(() => { localStorage.setItem('pharmacy_dispense_history', JSON.stringify(dispenseHistory)); }, [dispenseHistory]);

  const login = (username, role) => {
    const userData = { username, role };
    setUser(userData);
    localStorage.setItem('pharmacy_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pharmacy_user');
  };

  return (
    <AuthContext.Provider value={{
      user, login, logout,
      medicines, setMedicines,
      employees, setEmployees,
      suppliers, setSuppliers,
      dispenseHistory, setDispenseHistory,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
