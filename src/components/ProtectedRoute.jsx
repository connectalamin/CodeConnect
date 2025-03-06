import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, token } = useAuth(); // Destructure token for debugging
  const location = useLocation();

  const authenticated = isAuthenticated();
  console.log('ProtectedRoute - Authenticated:', authenticated, 'Token:', token, 'Path:', location.pathname);

  if (!authenticated) {
    toast.error('You must be logged in to view this page');
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return children;
};

export default ProtectedRoute;