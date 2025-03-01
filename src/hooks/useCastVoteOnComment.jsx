import { useMutation, useQueryClient } from '@tanstack/react-query';
import feedService from '../services/feedService';
import { useAuth } from './useAuth';

export const useCastVoteOnComment = (postId, commentId) => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation({
    mutationFn: (voteData) => {
      const fullVoteData = { ...voteData, commentId }; // Add commentId to voteData
      return feedService.castVote(fullVoteData, token); // Unified voting method
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', postId]); // Invalidate comments for this post
    },
    onError: (error) => {
      console.error('Error voting on comment:', error.message);
    },
  });
};