import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import PropTypes from 'prop-types';

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated()) {
    return <Navigate to="/profile" replace />;
  }

  return children;
};

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired
};

export default PublicRoute;