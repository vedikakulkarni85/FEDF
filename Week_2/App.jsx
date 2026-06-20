import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import Medicines from './pages/Medicines';
import Employees from './pages/Employees';
import Suppliers from './pages/Suppliers';
import DispenseMedicine from './pages/DispenseMedicine';
import Reports from './pages/Reports';
import History from './pages/History';
import ExpiryTracking from './pages/ExpiryTracking';
import StockMonitoring from './pages/StockMonitoring';

import './styles/dashboard.css'; // Load extra page styles directly

const DashboardLayout = ({ children }) => (
  <div className="app-container">
    <Navbar />
    <div className="main-layout">
      <Sidebar />
      <main className="content-workspace">{children}</main>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* Admin Restricted Workspace Routing */}
          <Route path="/admin-dashboard" element={<AdminRoute><DashboardLayout><AdminDashboard /></DashboardLayout></AdminRoute>} />
          <Route path="/employees" element={<AdminRoute><DashboardLayout><Employees /></DashboardLayout></AdminRoute>} />
          <Route path="/stock-monitoring" element={<AdminRoute><DashboardLayout><StockMonitoring /></DashboardLayout></AdminRoute>} />
          <Route path="/history" element={<AdminRoute><DashboardLayout><History /></DashboardLayout></AdminRoute>} />

          {/* Combined Workspaces Router Group */}
          <Route path="/employee-dashboard" element={<ProtectedRoute><DashboardLayout><EmployeeDashboard /></DashboardLayout></ProtectedRoute>} />
          <Route path="/medicines" element={<ProtectedRoute><DashboardLayout><Medicines /></DashboardLayout></ProtectedRoute>} />
          <Route path="/suppliers" element={<ProtectedRoute><DashboardLayout><Suppliers /></DashboardLayout></ProtectedRoute>} />
          <Route path="/dispense" element={<ProtectedRoute><DashboardLayout><DispenseMedicine /></DashboardLayout></ProtectedRoute>} />
          <Route path="/expiry" element={<ProtectedRoute><DashboardLayout><ExpiryTracking /></DashboardLayout></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute><DashboardLayout><Reports /></DashboardLayout></ProtectedRoute>} />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;