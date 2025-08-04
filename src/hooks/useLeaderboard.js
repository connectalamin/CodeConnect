import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import leaderboardService from '../services/leaderboardService';
import { useAuth } from './useAuth';

export const useLeaderboard = (params = {}) => {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['leaderboard', params],
    queryFn: () => leaderboardService.getLeaderboard(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });

  return {
    leaderboard: data?.data?.leaderboard || [],
    pagination: data?.data?.pagination || {},
    isLoading,
    isError,
    error,
    refetch
  };
};

export const useLeaderboardByMetric = (params = {}) => {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['leaderboard-metric', params],
    queryFn: () => leaderboardService.getLeaderboardByMetric(params),
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });

  return {
    leaderboard: data?.data?.leaderboard || [],
    metric: data?.data?.metric || 'karma',
    pagination: data?.data?.pagination || {},
    isLoading,
    isError,
    error,
    refetch
  };
};

export const useLeaderboardStats = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['leaderboard-stats'],
    queryFn: () => leaderboardService.getLeaderboardStats(),
    staleTime: 10 * 60 * 1000, // 10 minutes
    cacheTime: 20 * 60 * 1000, // 20 minutes
  });

  return {
    stats: data?.data || {},
    isLoading,
    isError,
    error,
    refetch
  };
};

export const useMyLeaderboardPosition = () => {
  const { token, isAuthenticated } = useAuth();
  
  const {
    data,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['my-leaderboard-position', token],
    queryFn: () => leaderboardService.getMyPosition(token),
    enabled: isAuthenticated() && !!token,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });

  return {
    position: data?.data || {},
    isLoading,
    isError,
    error,
    refetch
  };
};

export const useUserPosition = (userId) => {
  const { token, isAuthenticated } = useAuth();
  
  const {
    data,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['user-position', userId, token],
    queryFn: () => leaderboardService.getUserPosition(userId, token),
    enabled: isAuthenticated() && !!token && !!userId,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });

  return {
    position: data?.data || {},
    isLoading,
    isError,
    error,
    refetch
  };
};
