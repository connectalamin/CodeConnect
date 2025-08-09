// AuthContexts.jsx
import { createContext, useState, useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import authService from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);
  const logoutTimeout = useRef(null);
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);

        setUser(decoded);
        localStorage.setItem("token", token);

        const expiresIn = decoded.exp * 1000 - Date.now();
        if (expiresIn > 0) {
          logoutTimeout.current = setTimeout(logout, expiresIn);
        } else {
          logout();
        }
      } catch (error) {
        console.error("Invalid token:", error);
        logout();
      }
    } else {
      setUser(null);
      localStorage.removeItem("token");
    }
    return () => {
      if (logoutTimeout.current) {
        clearTimeout(logoutTimeout.current);
        logoutTimeout.current = null;
      }
    };
  }, [token]);

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      setToken(response.data.token);
      return response;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      if (error?.response?.status !== 401) {
        console.error("Logout error:", error);
      }
    } finally {
      if (logoutTimeout.current) {
        clearTimeout(logoutTimeout.current);
        logoutTimeout.current = null;
      }
      setToken(null);
      setUser(null);
      localStorage.removeItem("token");
    }
  };

  const isAuthenticated = () => !!token;
  const getToken = () => token;
  const role = user?.role || ""; // Provide role as a string

  const value = { token, user, login, logout, isAuthenticated, getToken, role };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext };
