import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from './useAuth';
import authService from '../services/authService';

export const useProfile = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { token, isAuthenticated } = useAuth();

  const {
    data: profile,
    isLoading: loading,
    error,
    refetch: refetchProfile,
  } = useQuery({
    queryKey: ['profile', token, userId],
    queryFn: async () => {
      if (!isAuthenticated()) {
        navigate('/login');
        throw new Error('Not authenticated');
      }

      try {
        const response = userId
          ? await authService.getPublicProfile(userId)
          : await authService.getProfile(token);
        return response.data;
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
    staleTime: 1000 * 60 * 1,
    cacheTime: 1000 * 60 * 10,
  });

  return {
    profile,
    loading,
    error: error?.message || null,
    refetchProfile,
  };
};