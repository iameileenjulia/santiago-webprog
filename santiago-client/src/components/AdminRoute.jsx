import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const type = localStorage.getItem('type');
  if (!token) return <Navigate to="/auth/signin" replace />;
  if (type !== 'admin') return <Navigate to="/dashboard" replace />;
  return children;
};

export default AdminRoute;
