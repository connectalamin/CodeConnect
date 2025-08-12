import axios from 'axios';

// Temporary hardcoded URL to fix production issue
const API_URL = 'https://codeconnect-backend-ftku.onrender.com';

const adminService = {
  // Seed database with sample data
  seedDatabase: async (token) => {
    return axios.post(`${API_URL}/api/seed/seed`, {}, {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  },

  // Clear all database data
  clearDatabase: async (token) => {
    return axios.delete(`${API_URL}/api/seed/clear`, {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  },

  // Get database stats
  getDatabaseStats: async (token) => {
    return axios.get(`${API_URL}/api/seed/stats`, {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  }
};

export default adminService;