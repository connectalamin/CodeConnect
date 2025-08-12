import axios from 'axios';

// Temporary hardcoded URL to fix production issue
const API_URL = 'https://codeconnect-backend-ftku.onrender.com';

// User Management Functions
export const getUsers = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/admin/users`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data; // Expecting { users: [...] }
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error.response?.data || error.message;
  }
};

export const deleteUser = async (userId, token) => {
  try {
    const response = await axios.delete(`${API_URL}/admin/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error.response?.data || error.message;
  }
};

// Category Management Functions
export const getCategories = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/admin/categories`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    return response.data; // Expecting { categories: [...] }
  } catch (error) {
    console.error('Error fetching categories:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

export const createCategory = async (categoryData, token) => {
  try {
    const response = await axios.post(`${API_URL}/admin/categories`, categoryData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error.response?.data || error.message;
  }
};

export const updateCategory = async (categoryId, categoryData, token) => {
  try {
    const response = await axios.patch(
      `${API_URL}/admin/categories/${categoryId}`,
      categoryData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating category:', error);
    throw error.response?.data || error.message;
  }
};

export const deleteCategory = async (categoryId, token) => {
  try {
    const response = await axios.delete(`${API_URL}/admin/categories/${categoryId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error.response?.data || error.message;
  }
};

// Seed Management Functions
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