/**
 * Project Validation Engine
 */

export const validatePhone = (phone) => {
  const cleanPhone = phone.trim();
  if (cleanPhone.length !== 10 || isNaN(cleanPhone)) {
    return { isValid: false, message: "Phone number must contain exactly 10 digits." };
  }
  return { isValid: true };
};

export const validateExpiry = (expiryDate) => {
  const today = new Date().toISOString().split('T')[0];
  if (expiryDate < today) {
    return { isValid: false, message: "Expired medicines cannot be added." };
  }
  return { isValid: true };
};

export const validatePositiveNumber = (value, fieldName) => {
  if (Number(value) <= 0 || isNaN(value)) {
    return { isValid: false, message: `${fieldName} must be greater than zero.` };
  }
  return { isValid: true };
};

export const validateUniqueBarcode = (barcode, currentMedicines, editingIndex = null) => {
  const barcodeExists = currentMedicines.some(
    (med, idx) => med.barcode === barcode && idx !== editingIndex
  );
  if (barcodeExists) {
    return { isValid: false, message: "Barcode already exists." };
  }
  return { isValid: true };
};