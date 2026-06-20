/**
 * LocalStorage Interaction Layer
 */
const KEYS = {
  USER: 'pharmacy_user',
  MEDICINES: 'pharmacy_medicines',
  EMPLOYEES: 'pharmacy_employees',
  SUPPLIERS: 'pharmacy_suppliers',
  HISTORY: 'pharmacy_dispense_history'
};

export const localStorageService = {
  getAuthUser: () => JSON.parse(localStorage.getItem(KEYS.USER)) || null,
  setAuthUser: (user) => localStorage.setItem(KEYS.USER, JSON.stringify(user)),
  clearAuthUser: () => localStorage.removeItem(KEYS.USER),

  getMedicines: () => JSON.parse(localStorage.getItem(KEYS.MEDICINES)) || [],
  setMedicines: (data) => localStorage.setItem(KEYS.MEDICINES, JSON.stringify(data)),

  getEmployees: () => JSON.parse(localStorage.getItem(KEYS.EMPLOYEES)) || [],
  setEmployees: (data) => localStorage.setItem(KEYS.EMPLOYEES, JSON.stringify(data)),

  getSuppliers: () => JSON.parse(localStorage.getItem(KEYS.SUPPLIERS)) || [],
  setSuppliers: (data) => localStorage.setItem(KEYS.SUPPLIERS, JSON.stringify(data)),

  getHistory: () => JSON.parse(localStorage.getItem(KEYS.HISTORY)) || [],
  setHistory: (data) => localStorage.setItem(KEYS.HISTORY, JSON.stringify(data))
};