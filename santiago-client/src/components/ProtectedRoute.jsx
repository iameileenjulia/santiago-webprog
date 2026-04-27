import { Navigate } from 'react-router-dom';
import { useAuth } from '../assets/context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/auth/signin" replace />;
  }
  return children;
};

export default ProtectedRoute;