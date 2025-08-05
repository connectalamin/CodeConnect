import axios from 'axios';

const API_URL = import.meta.env.VITE_SERVER_DEFAULT_API || 'http://localhost:5000/api'; 

const authService = {
  register: async (userData) => {
    return axios.post(`${API_URL}/auth/signup`, userData);
  },

  login: async (credentials) => {
    return axios.post(`${API_URL}/auth/login`, credentials);
  },

  // Email verification methods
  verifyEmail: async (token) => {
    return axios.get(`${API_URL}/auth/verify-email/${token}`);
  },

  resendVerificationEmail: async (email) => {
    return axios.post(`${API_URL}/auth/resend-verification`, { email });
  },

  // Password reset methods
  forgotPassword: async (email) => {
    return axios.post(`${API_URL}/auth/forgot-password`, { email });
  },

  resetPassword: async (token, password) => {
    return axios.post(`${API_URL}/auth/reset-password`, { token, password });
  },

  getProfile: async (token) => {
    return axios.get(`${API_URL}/api/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  getPublicProfile: async (userId) => {
    return axios.get(`${API_URL}/api/users/${userId}`); // No token needed if public
  },
  updateProfile: async (token, profileData) => {
    return axios.patch(`${API_URL}/api/profile`, profileData, {
      headers: { 
        Authorization: `Bearer ${token}`,
       
      },
    });
  },

  logout: async () => {
    const token = localStorage.getItem('token');
    try {
      return await axios.post(`${API_URL}/auth/logout`, {}, {
        headers: { 
          Authorization: `Bearer ${token}`
        }
      });
     } catch (error) {
      if (error?.response?.status === 401) {

        return { status: 200, message: 'Logged out successfully' };
      }
      throw error;
    }
  }
};

export default authService;