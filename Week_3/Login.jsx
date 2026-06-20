import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [selectedRole, setSelectedRole] = useState('admin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please enter username and password.');
      return;
    }

    if (selectedRole === 'admin') {
      if (username === 'admin' && password === 'admin123') {
        login(username, 'admin');
        navigate('/admin-dashboard');
      } else {
        setError('Invalid Admin credentials.');
      }
    } else if (selectedRole === 'employee') {
      if (username === 'employee' && password === 'emp123') {
        login(username, 'employee');
        navigate('/employee-dashboard');
      } else {
        setError('Invalid Employee credentials.');
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleLogin(e);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>💊 PharmaSys</h2>
        <p>Pharmacy Inventory Management</p>

        <div className="role-selector">
          <button
            type="button"
            className={selectedRole === 'admin' ? 'active-role' : ''}
            onClick={() => { setSelectedRole('admin'); setError(''); }}
          >
            Admin Login
          </button>
          <button
            type="button"
            className={selectedRole === 'employee' ? 'active-role' : ''}
            onClick={() => { setSelectedRole('employee'); setError(''); }}
          >
            Employee Login
          </button>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter username"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter password"
          />
        </div>

        <button
          className="btn btn-primary"
          style={{ width: '100%', padding: '10px', marginTop: '4px' }}
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
