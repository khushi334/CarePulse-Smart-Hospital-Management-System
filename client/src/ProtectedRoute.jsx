import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, allowedRole }) {
  // Read the active role from the browser memory
  const currentRole = localStorage.getItem('userRole');

  // If no one is logged in, send them straight to the login screen
  if (!currentRole) {
    return <Navigate to="/login" replace />;
  }

  // If they are logged in but trying to access a dashboard that isn't theirs
  if (currentRole !== allowedRole) {
    return <Navigate to="/login" replace />;
  }

  // If everything matches perfectly, render the protected dashboard page
  return children;
}