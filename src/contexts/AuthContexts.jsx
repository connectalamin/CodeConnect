import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import authService from '../services/authService';
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded); // Assuming your JWT payload includes user data (e.g., id, name, email)
        localStorage.setItem('token', token);
      } catch (error) {
        console.error('Invalid token:', error);
        logout();
      }
    } else {
      setUser(null);
      localStorage.removeItem('token');
    }
  }, [token]);

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      setToken(response.data.token);
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Try to logout on server
      await authService.logout();
    } catch (error) {
      // Ignore 401 errors since we're logging out anyway
      if (error?.response?.status !== 401) {
        console.error('Logout error:', error);
      }
    } finally {
      // Always clean up local state regardless of server response
      setToken(null);
      setUser(null);
      localStorage.removeItem('token');

    }
  };

  const isAuthenticated = () => !!token;

  const value = { token, user, login, logout, isAuthenticated };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext };