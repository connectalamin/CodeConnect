import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import feedService from '../services/feedService';

export const usePost = () => {
  const navigate = useNavigate();
  const { token, isAuthenticated } = useAuth();

  const {
    data,
    isLoading: loading,
    error,
    refetch: refetchPosts,
  } = useQuery({
    queryKey: ['posts', token],
    queryFn: async () => {
      if (!isAuthenticated()) {
        navigate('/login');
        throw new Error('Not authenticated');
      }

      try {
        const response = await feedService.getAllPosts(token);
        return response.posts; 
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
        throw err;
      }
    },
    enabled: !!token && isAuthenticated(),
    retry: 1,
    staleTime: 1000 * 60 * 5, 
    cacheTime: 1000 * 60 * 30, 
  });

  return {
    posts: data || [],
    loading,
    error: error?.message || null,
    refetchPosts,
  };
};