import axios from 'axios';

const API_URL = 'http://localhost:5000';

// FeedService for handling posts, comments, and votes
const feedService = {
  // Posts (unchanged)
  getAllPosts: async (token) => {
    try {
      const response = await axios.get(`${API_URL}/api/posts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch posts');
    }
  },

  getPostById: async (postId, token) => {
    try {
      const response = await axios.get(`${API_URL}/api/post/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch post');
    }
  },

  createPost: async (postData, token) => {
    try {
      const response = await axios.post(`${API_URL}/api/post`, postData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to create post');
    }
  },

  updatePost: async (postId, postData, token) => {
    try {
      const response = await axios.patch(`${API_URL}/api/post/${postId}`, postData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to update post');
    }
  },

  deletePost: async (postId, token) => {
    try {
      const response = await axios.delete(`${API_URL}/api/post/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to delete post');
    }
  },

  // Comments (unchanged)
  getCommentsByPostId: async (postId, token) => {
    try {
      const response = await axios.get(`${API_URL}/api/post/${postId}/comment`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch comments');
    }
  },

  createComment: async (postId, commentData, token) => {
    try {
      const response = await axios.post(`${API_URL}/api/post/${postId}/comment`, commentData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to create comment');
    }
  },
  updateComment: async (commentId, commentData, token) => {
    try {
      const response = await axios.patch(`${API_URL}/api/post/comment/${commentId}`, commentData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to update comment');
    }
  },

  deleteComment: async (postId, commentId, token) => {
    try {
      const response = await axios.delete(`${API_URL}/api/post//comment/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to delete comment');
    }
  },

  castVote: async (voteData, token) => {
    try {
      const response = await axios.post(`${API_URL}/api/votes`, voteData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error('Full vote error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.error || 'Failed to cast vote');
    }
  },

  toggleBestAnswer: async (commentId, token) => {
    try {
      const response = await axios.patch(`${API_URL}/api/post/comment/${commentId}/best`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to toggle best answer');
    }
  },
};

export default feedService;