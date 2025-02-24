import { useInfiniteQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import feedService from '../services/feedService';

export const usePost = () => {
  const navigate = useNavigate();
  const { token, isAuthenticated } = useAuth();

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    refetch, // Add refetch for manual triggering if needed
  } = useInfiniteQuery({
    queryKey: ['posts', token],
    queryFn: async ({ pageParam = 1 }) => {
      if (!isAuthenticated()) {
        navigate('/login');
        throw new Error('Not authenticated');
      }

      try {
        console.log('Fetching posts with token:', token, 'page:', pageParam);
        const response = await feedService.getAllPosts(token, pageParam);
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
    getNextPageParam: (lastPage) => lastPage.nextPage ?? false,
    enabled: !!token && isAuthenticated(),
    retry: 1,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
  });

  return {
    posts: data?.pages.flatMap(page => page.posts) || [],
    isLoading,
    isError,
    error: error?.message || null,
    fetchNextPage,
    hasNextPage,
    refetch, // Expose refetch for debugging
  };
};