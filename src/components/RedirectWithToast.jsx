import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const RedirectWithToast = ({ to, message }) => {
  useEffect(() => {
    toast.error(message);
  }, [message]);
  return <Navigate to={to} replace />;
};

export default RedirectWithToast;