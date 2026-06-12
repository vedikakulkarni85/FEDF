// ============================================================
// FILE: src/utils/storage.js
// Description: localStorage helper functions
// All data is saved/loaded from the browser's localStorage.
// localStorage persists data even after closing the browser.
// ============================================================

/**
 * Loads JSON data from localStorage by key.
 * If nothing is saved yet (first run), returns the fallback value.
 *
 * @param {string} key - The localStorage key to read from
 * @param {*} fallback - Default value if nothing is saved
 * @returns {*} Parsed data or fallback
 */
export function loadFromStorage(key, fallback) {
  try {
    const data = localStorage.getItem(key);
    // If data exists, parse it; otherwise return the default fallback
    return data ? JSON.parse(data) : fallback;
  } catch {
    // If parsing fails (corrupted data), return fallback
    return fallback;
  }
}

/**
 * Saves any value to localStorage as a JSON string.
 *
 * @param {string} key - The localStorage key to save under
 * @param {*} value - The value to save (any JSON-serializable type)
 */
export function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
