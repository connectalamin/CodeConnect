import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import feedService from '../services/feedService';

export const usePost = (page = 1, pageSize = 3) => {
  const navigate = useNavigate();
  const { token, isAuthenticated } = useAuth();

  const {
    data,
    isLoading,
    isError,
    error,
    refetch, // Add refetch for manual triggering if needed
  } = useQuery({
    queryKey: ['posts', token, page, pageSize],
    queryFn: async () => {
      if (!isAuthenticated()) {
        navigate('/login');
        throw new Error('Not authenticated');
      }

      try {
        console.log('Fetching posts with token:', token, 'page:', page, 'pageSize:', pageSize);
        const response = await feedService.getAllPosts(token, page, pageSize);
        console.log('Posts fetched:', response);
        return response;
      } catch (err) {
        console.error('Fetch error:', err);
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
    posts: data?.posts || [],
    totalPosts: data?.total || 0, // Assuming the API returns total posts
    isLoading,
    isError,
    error: error?.message || null,
    refetch,
  };
};