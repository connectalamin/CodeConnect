import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import authService from '../services/authService';

export const useCurrentUserProfile = () => {
  const navigate = useNavigate();
  const { token, isAuthenticated } = useAuth();

  const {
    data: profile,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ['currentUserProfile', token],
    queryFn: async () => {
      if (!isAuthenticated()) {
        navigate('/login');
        throw new Error('Not authenticated');
      }
      const response = await authService.getProfile(token); // Always fetch current user's profile
      return response.data;
    },
    enabled: !!token && isAuthenticated(),
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 15, // 15 minutes
  });

  return {
    profile,
    loading,
    error: error?.message || null,
  };
};