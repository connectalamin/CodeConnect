// src/hooks/useUserManagement.js
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getUsers, deleteUser } from "../services/adminService";

export const useUserManagement = (token) => {
  const queryClient = useQueryClient();
  const [error, setError] = useState(null);

  const { data: users, isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(token).catch(err => { throw err; }), // Ensure error is thrown
    retry: 1, // Limit retries
    onError: (err) => setError(err.message || 'Failed to fetch users'),
  });

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