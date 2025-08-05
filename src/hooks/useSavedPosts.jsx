import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import savedPostService from '../services/savedPostService';
import toast from 'react-hot-toast';

export const useSavedPosts = () => {
  const { token } = useAuth();
  const [savedPosts, setSavedPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });

  // Fetch saved posts
  const fetchSavedPosts = async (page = 1) => {
    if (!token) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await savedPostService.getSavedPosts(token, page);
      setSavedPosts(response.savedPosts);
      setPagination(response.pagination);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Save a post
  const savePost = async (postId) => {
    if (!token) {
      toast.error('Please login to save posts');
      return false;
    }

    try {
      await savedPostService.savePost(postId, token);
      toast.success('Post saved successfully');
      // Auto-refresh the saved posts list
      fetchSavedPosts(pagination.page);
      return true;
    } catch (err) {
      toast.error(err.message);
      return false;
    }
  };

  // Unsave a post
  const unsavePost = async (postId) => {
    if (!token) {
      toast.error('Please login to unsave posts');
      return false;
    }

    try {
      await savedPostService.unsavePost(postId, token);
      toast.success('Post unsaved successfully');
      // Auto-refresh the saved posts list
      fetchSavedPosts(pagination.page);
      return true;
    } catch (err) {
      toast.error(err.message);
      return false;
    }
  };

  // Check if a post is saved
  const checkIfSaved = async (postId) => {
    if (!token) return false;

    try {
      const response = await savedPostService.checkIfSaved(postId, token);
      return response.isSaved;
    } catch (err) {
      console.error('Error checking if post is saved:', err);
      return false;
    }
  };

  // Load saved posts on mount
  useEffect(() => {
    if (token) {
      fetchSavedPosts();
    }
  }, [token]);

  return {
    savedPosts,
    loading,
    error,
    pagination,
    fetchSavedPosts,
    savePost,
    unsavePost,
    checkIfSaved
  };
}; 