import axios from 'axios';

const API_URL = import.meta.env.VITE_SERVER_DEFAULT_API || 'http://localhost:5000';

const savedPostService = {
  // Save a post
  savePost: async (postId, token) => {
    try {
      const response = await axios.post(`${API_URL}/api/posts/${postId}/save`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to save post');
    }
  },

  // Unsave a post
  unsavePost: async (postId, token) => {
    try {
      const response = await axios.delete(`${API_URL}/api/posts/${postId}/save`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to unsave post');
    }
  },

  // Get user's saved posts
  getSavedPosts: async (token, page = 1, limit = 10) => {
    try {
      const response = await axios.get(`${API_URL}/api/saved-posts?page=${page}&limit=${limit}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch saved posts');
    }
  },

  // Check if a post is saved by current user
  checkIfSaved: async (postId, token) => {
    try {
      const response = await axios.get(`${API_URL}/api/posts/${postId}/saved`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to check if post is saved');
    }
  }
};

export default savedPostService; 