// hooks/useUpdateComment.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import feedService from '../services/feedService';
import { useAuth } from './useAuth';

export const useUpdateComment = (commentId) => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation({
    mutationFn: (commentData) => feedService.updateComment(commentId, commentData, token),
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', commentId]); // Refresh comments after updating
      queryClient.invalidateQueries(['posts']); // Refresh posts if needed
    },
    onError: (error) => {
      console.error('Error updating comment:', error.message);
    },
  });
};