// src/hooks/useUserManagement.js
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getUsers, deleteUser } from "../services/adminService";

export const useUserManagement = (token) => {
  const queryClient = useQueryClient();
  const [error, setError] = useState(null);

  // Fetch only when token is present to avoid initial 403 race after redirect
  const { data: users, isLoading, isError, status, refetch } = useQuery({
    queryKey: ['users', !!token],
    enabled: !!token, // don't run until token ready
    staleTime: 30_000,
    retry: 0, // avoid retry storm on auth failures
    queryFn: async () => {
      try {
        const data = await getUsers(token);
        return data;
      } catch (err) {
        // Normalize to object with message
        if (typeof err === 'string') {
          throw new Error(err);
        }
        if (!err.message && err.error) {
          throw new Error(err.error);
        }
        throw err;
      }
    },
    onError: (err) => setError(err.message || 'Failed to fetch users'),
    onSuccess: () => {
      if (error) setError(null);
    }
  });

  // When token first appears (after login), ensure we refetch if query was idle
  useEffect(() => {
    if (token && status === 'idle') {
      refetch();
    }
  }, [token, status, refetch]);

  // If token changes (re-login), clear cached users & refetch
  useEffect(() => {
    if (token) {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  }, [token, queryClient]);

  const deleteMutation = useMutation({
    mutationFn: ({ userId }) => deleteUser(userId, token),
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      toast.success('User deleted successfully');
      setError(null);
    },
    onError: (err) => setError(err.message || 'Failed to delete user'),
  });

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteMutation.mutate({ userId });
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return {
    users: users?.users || [], // Safely handle undefined data
    isLoading,
    isError,
    error,
    handleDelete,
    isDeleting: deleteMutation.isLoading,
  };
};