import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from './useAuth';
import feedService from '../services/feedService';

export const useToggleBestAnswer = (postId) => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId) => feedService.toggleBestAnswer(commentId, token),
    onSuccess: () => {
      // Invalidate the post query to refetch with updated best answer
      queryClient.invalidateQueries(['post', postId]);
    },
  });
};