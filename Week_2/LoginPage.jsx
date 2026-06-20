// ============================================================
// FILE: src/components/LoginPage.jsx
// Description: Login screen shown before the user enters the app.
// No real authentication — accepts any username/password (demo mode).
// Props:
//   onLogin(userData) - called when login button is clicked
// ============================================================

import React, { useState } from 'react';

function LoginPage({ onLogin }) {
  // State for form fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Called when user clicks the Login button
  function handleLogin() {
    // Basic validation — both fields must be filled
    if (!username.trim() || !password.trim()) {
      setError('Please enter username and password.');
      return;
    }
    // Login with admin role by default
    onLogin({ username, role: 'admin' });
  }

  // Allow pressing Enter to submit login
  function handleKeyDown(e) {
    if (e.key === 'Enter') handleLogin();
  }

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2>💊 PharmaSys</h2>
        <p>Pharmacy Inventory Management</p>

        {/* Show error message if validation fails */}
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="form-group">
          <label>Username</label>
          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter username"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter password"
          />
        </div>

        <button
          className="btn btn-primary"
          style={{ width: '100%', padding: '10px' }}
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
