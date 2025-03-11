import { useAuth } from '../hooks/useAuth';
import RedirectWithToast from './RedirectWithToast';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, role } = useAuth();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  
  useEffect(() => {
    // Short timeout to ensure auth state is fully loaded
    const timer = setTimeout(() => {
      setIsCheckingAuth(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Show nothing while checking auth state
  if (isCheckingAuth) {
    return null;
  }
  
  if (!isAuthenticated()) {
    return <RedirectWithToast to="/login" message="Please log in" />;
  }

  // Case-insensitive comparison for role
  if (adminOnly && role?.toUpperCase() !== 'ADMIN') {

    return <RedirectWithToast to="/feed" message="Admin access required" />;
  }

  return children;
};

export default ProtectedRoute;