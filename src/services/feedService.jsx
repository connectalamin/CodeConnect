import axios from 'axios';

const API_URL = 'http://localhost:5000';

// FeedService for handling posts, comments, and votes
const feedService = {
  // Posts
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

  // Comments
  getCommentsByPostId: async (postId, token) => {
    try {
      const response = await axios.get(`${API_URL}/api/post/${postId}/comments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch comments');
    }
  },

  createComment: async (postId, commentData, token) => {
    try {
      const response = await axios.post(`${API_URL}/api/post/${postId}/comments`, commentData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to create comment');
    }
  },

  updateComment: async (postId, commentId, commentData, token) => {
    try {
      const response = await axios.patch(`${API_URL}/api/post/${postId}/comments/${commentId}`, commentData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to update comment');
    }
  },

  deleteComment: async (postId, commentId, token) => {
    try {
      const response = await axios.delete(`${API_URL}/api/post/${postId}/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to delete comment');
    }
  },

  // Votes (for Posts and Comments)
  castVoteOnPost: async (postId, voteData, token) => {
    try {
      const response = await axios.post(`${API_URL}/api/post/${postId}/votes`, voteData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to cast vote on post');
    }
  },

  castVoteOnComment: async (postId, commentId, voteData, token) => {
    try {
      const response = await axios.post(`${API_URL}/api/post/${postId}/comments/${commentId}/votes`, voteData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to cast vote on comment');
    }
  },

  removeVoteOnPost: async (postId, voteId, token) => {
    try {
      const response = await axios.delete(`${API_URL}/api/post/${postId}/votes/${voteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to remove vote on post');
    }
  },

  removeVoteOnComment: async (postId, commentId, voteId, token) => {
    try {
      const response = await axios.delete(`${API_URL}/api/post/${postId}/comments/${commentId}/votes/${voteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to remove vote on comment');
    }
  },
};

export default feedService;