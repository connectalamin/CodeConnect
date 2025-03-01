import { useMutation, useQueryClient } from '@tanstack/react-query';
import feedService from '../services/feedService';
import { useAuth } from './useAuth';

export const useCreateComment = (postId) => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation({
    mutationFn: (commentData) => feedService.createComment(postId, commentData, token),
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', postId]); // Refresh comments after adding
    },
    onError: (error) => {
      console.error('Error creating comment:', error.message);
    },
  });
};