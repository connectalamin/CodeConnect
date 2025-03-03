// hooks/useDeleteComment.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import feedService from '../services/feedService';
import { useAuth } from './useAuth';

export const useDeleteComment = (postId, commentId) => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation({
    mutationFn: () => feedService.deleteComment(postId, commentId, token),
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', postId]); // Refresh comments after deletion
      queryClient.invalidateQueries(['posts']); // Refresh posts if needed
    },
    onError: (error) => {
      console.error('Error deleting comment:', error.message);
    },
  });
};