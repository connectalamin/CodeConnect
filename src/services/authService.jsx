import axios from 'axios';

const API_URL = 'http://localhost:5000'; 

const authService = {
  register: async (userData) => {
    return axios.post(`${API_URL}/auth/signup`, userData);
  },

  login: async (credentials) => {
    return axios.post(`${API_URL}/auth/login`, credentials);
  },

  getProfile: async (token) => {
    return axios.get(`${API_URL}/api/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
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