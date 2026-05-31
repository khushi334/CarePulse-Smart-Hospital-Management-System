import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import PatientDashboard from './PatientDashboard';
import DoctorDashboard from './DoctorDashboard';
import AdminDashboard from './AdminDashboard';

// ========================================================
// SECURITY ROUTE GUARD COMPONENT
// ========================================================
function ProtectedRoute({ children, allowedRole }) {
  const userId = localStorage.getItem('userId');
  const userRole = localStorage.getItem('userRole');

  // Guard 1: Is the user logged in at all?
  if (!userId) {
    return <Navigate to="/login" replace />;
  }

  // Guard 2: Does the user's role match the page permissions?
  if (allowedRole && userRole !== allowedRole) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Portal Route */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Locked Protected Workspace Gateways */}
        <Route path="/patient-dashboard" element={
          <ProtectedRoute allowedRole="patient">
            <PatientDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/doctor-dashboard" element={
          <ProtectedRoute allowedRole="doctor">
            <DoctorDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/admin-dashboard" element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } />

        {/* Fallback Catch */}
        <Route path="*" replace element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}